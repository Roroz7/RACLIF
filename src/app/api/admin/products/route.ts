import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const data = await request.json();
    // Validate inputs here

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        game: data.game,
        status: data.status,
        features: data.features || [],
        images: data.images || [],
      }
    });

    if (data.prices && data.prices.length > 0) {
      await prisma.price.createMany({
        data: data.prices.map((p: any) => ({
          ...p,
          productId: product.id
        }))
      });
    }

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la création du produit" }, { status: 500 });
  }
}
