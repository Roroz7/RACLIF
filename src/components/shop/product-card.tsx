import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    name: string;
    description: string;
    game: string;
    images: string[];
    status: string;
    prices: { amount: number }[];
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UNDETECTED': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'DETECTED': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'MAINTENANCE': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'UPDATING': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Link href={`/shop/${product.id}`} className="block group">
      <div className="relative bg-[#111118] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)] flex flex-col h-full">
        {/* Image */}
        <div className="aspect-[16/9] bg-[#1A1A2E] relative">
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">Aperçu indisponible</div>
          )}
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
             <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(product.status)}`}>
                {product.status}
             </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="text-xs text-primary font-medium mb-2 uppercase tracking-wider">{product.game}</div>
          <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
          <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-grow">{product.description}</p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
             <div className="text-lg font-bold text-white">
               {product.prices?.[0] ? `Dès ${product.prices[0].amount}€` : 'Indisponible'}
             </div>
             <button className="p-2 rounded-lg bg-white/5 hover:bg-primary text-white transition-colors" title="Acheter" type="button">
               <ShoppingCart size={18} />
             </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
