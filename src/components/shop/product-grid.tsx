import { ProductCard } from './product-card';

export function ProductGrid({ products }: { products: any[] }) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border border-white/5 rounded-2xl bg-[#111118]/50">
        <div className="text-gray-400 text-lg mb-2">Aucun produit disponible</div>
        <p className="text-sm text-gray-500">Essayez de modifier vos filtres ou revenez plus tard.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
