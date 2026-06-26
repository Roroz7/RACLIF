import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { code, productId, amount } = await request.json();

    if (!code || !productId || amount === undefined) {
      return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
    }

    const promo = await prisma.promoCode.findUnique({
      where: { code: code.toUpperCase() }
    });

    if (!promo || !promo.isActive) {
      return NextResponse.json({ error: "Code promo invalide ou inactif" }, { status: 404 });
    }

    if (promo.expiresAt && promo.expiresAt < new Date()) {
      return NextResponse.json({ error: "Ce code promo a expiré" }, { status: 400 });
    }

    if (promo.maxUses && promo.currentUses >= promo.maxUses) {
      return NextResponse.json({ error: "Ce code promo a atteint sa limite d'utilisation" }, { status: 400 });
    }

    if (promo.minOrderAmount && amount < promo.minOrderAmount) {
      return NextResponse.json({ error: `Montant minimum de ${promo.minOrderAmount}€ requis` }, { status: 400 });
    }

    if (promo.applicableProducts.length > 0 && !promo.applicableProducts.includes(productId)) {
      return NextResponse.json({ error: "Ce code promo n'est pas applicable à ce produit" }, { status: 400 });
    }

    let discount = 0;
    if (promo.type === 'PERCENTAGE') {
      discount = (amount * promo.value) / 100;
    } else {
      discount = promo.value;
    }

    return NextResponse.json({
      valid: true,
      discount,
      finalAmount: Math.max(0, amount - discount),
      type: promo.type,
      value: promo.value
    });

  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la validation du code promo" }, { status: 500 });
  }
}
