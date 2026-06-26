import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const game = searchParams.get('game');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where = {
      isActive: true,
      ...(game ? { game } : {})
    };

    const products = await prisma.product.findMany({
      where,
      include: {
        prices: {
          orderBy: { amount: 'asc' },
          take: 1
        }
      },
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération des produits" }, { status: 500 });
  }
}
