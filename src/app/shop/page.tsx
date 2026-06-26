import { prisma } from '@/lib/prisma';
import { ProductGrid } from '@/components/shop/product-grid';
import { ProductFilters } from '@/components/shop/product-filters';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Boutique - Raclif',
  description: 'Découvrez nos cheats et hacks premium pour vos jeux préférés.',
};

export default async function ShopPage({
  searchParams
}: {
  searchParams: { game?: string }
}) {
  const { game } = searchParams;

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
    orderBy: { createdAt: 'desc' }
  });

  const uniqueGames = await prisma.product.findMany({
    where: { isActive: true },
    select: { game: true },
    distinct: ['game']
  });

  const games = uniqueGames.map(g => g.game).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white selection:bg-primary/30 flex flex-col">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 max-w-7xl mx-auto flex-grow w-full">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-outfit text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Notre Boutique</h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            Découvrez nos solutions de haute qualité. Tous nos produits sont mis à jour régulièrement pour garantir une sécurité maximale.
          </p>
        </div>

        <ProductFilters games={games} />
        
        <ProductGrid products={products} />
      </main>

      <Footer />
    </div>
  );
}
