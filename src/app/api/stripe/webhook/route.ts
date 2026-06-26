import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { generateKey } from '@/lib/license';
import { sendDiscordWebhook, buildEmbed } from '@/lib/webhook';
import { headers } from 'next/headers';
import Stripe from 'stripe';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    if (!endpointSecret) {
      event = JSON.parse(body) as Stripe.Event;
    } else {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    }
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    if (session.payment_status === 'paid' && session.metadata?.orderId) {
      const orderId = session.metadata.orderId;

      // Update Order Status
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status: 'PAID' },
        include: { user: true, product: true, price: true }
      });

      // Update Promo Code Uses if any
      if (order.promoCode) {
        await prisma.promoCode.update({
          where: { code: order.promoCode },
          data: { currentUses: { increment: 1 } }
        });
      }

      // Generate License
      const licenseKey = generateKey();
      
      const expiresAt = order.price.duration === 0 
        ? null 
        : new Date(Date.now() + order.price.duration * 24 * 60 * 60 * 1000);

      const license = await prisma.license.create({
        data: {
          key: licenseKey,
          status: 'UNUSED',
          productId: order.productId,
          userId: order.userId,
          orderId: order.id,
          expiresAt
        }
      });

      // Log & Webhook
      await prisma.log.create({
        data: {
          type: 'PURCHASE',
          message: `Nouvel achat de ${order.product.name} par ${order.user.username}`,
          userId: order.userId,
          metadata: { orderId: order.id, amount: order.totalAmount }
        }
      });

      if (process.env.DISCORD_WEBHOOK_SALES) {
        const embed = buildEmbed({
          title: "Nouvelle Vente 💰",
          description: `L'utilisateur **${order.user.username}** a acheté **${order.product.name}** (${order.price.label}).`,
          color: 0x10B981, // Green
          fields: [
            { name: "Montant", value: `${order.totalAmount}€`, inline: true },
            { name: "Commande", value: order.id, inline: true }
          ]
        });
        await sendDiscordWebhook(process.env.DISCORD_WEBHOOK_SALES, embed);
      }
    }
  }

  return NextResponse.json({ received: true });
}
