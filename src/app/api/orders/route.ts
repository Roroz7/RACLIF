import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { priceId, promoCode } = await request.json();

    const price = await prisma.price.findUnique({
      where: { id: priceId },
      include: { product: true }
    });

    if (!price || !price.product.isActive) {
      return NextResponse.json({ error: "Prix ou produit invalide" }, { status: 400 });
    }

    let amountToPay = price.amount;
    let discountAmount = 0;

    // Check Promo Code if provided
    if (promoCode) {
      const promo = await prisma.promoCode.findUnique({ where: { code: promoCode } });
      if (promo && promo.isActive && (!promo.expiresAt || promo.expiresAt > new Date())) {
        if (!promo.maxUses || promo.currentUses < promo.maxUses) {
          if (promo.type === 'PERCENTAGE') {
            discountAmount = (amountToPay * promo.value) / 100;
          } else if (promo.type === 'FIXED') {
            discountAmount = promo.value;
          }
          amountToPay = Math.max(0, amountToPay - discountAmount);
        }
      }
    }

    // Create Order in DB
    const order = await prisma.order.create({
      data: {
        totalAmount: amountToPay,
        discount: discountAmount,
        promoCode: promoCode || null,
        status: 'PENDING',
        userId: (session.user as any).id,
        productId: price.product.id,
        priceId: price.id
      }
    });

    // Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `${price.product.name} - ${price.label}`,
              description: price.product.description.substring(0, 200),
            },
            unit_amount: Math.round(amountToPay * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/shop/${price.product.id}?canceled=true`,
      metadata: {
        orderId: order.id,
        userId: (session.user as any).id,
      },
    });

    // Update order with payment ID
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: checkoutSession.id }
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Order creation error", error);
    return NextResponse.json({ error: "Erreur lors de la création de la commande" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: (session.user as any).id },
      include: {
        product: { select: { name: true, game: true } },
        licenses: { select: { key: true, status: true, expiresAt: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération des commandes" }, { status: 500 });
  }
}
