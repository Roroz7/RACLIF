import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Check, ShieldCheck, AlertTriangle, Clock } from 'lucide-react';
import Link from 'next/link';
import { ProductPurchaseForm } from '@/components/shop/product-purchase-form';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) return { title: 'Produit introuvable - Raclif' };
  return { title: `${product.name} - Raclif`, description: product.description };
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      prices: {
        orderBy: { amount: 'asc' }
      }
    }
  });

  if (!product) {
    notFound();
  }

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'UNDETECTED': return { icon: ShieldCheck, color: 'text-green-400', bg: 'bg-green-500/20 border-green-500/30', text: 'Undetected' };
      case 'DETECTED': return { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/20 border-red-500/30', text: 'Detected' };
      case 'MAINTENANCE': return { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/20 border-yellow-500/30', text: 'Maintenance' };
      case 'UPDATING': return { icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/20 border-blue-500/30', text: 'Updating' };
      default: return { icon: ShieldCheck, color: 'text-gray-400', bg: 'bg-gray-500/20 border-gray-500/30', text: status };
    }
  };

  const Status = getStatusDisplay(product.status);
  const StatusIcon = Status.icon;

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex flex-col">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 max-w-7xl mx-auto flex-grow w-full">
        <Link href="/shop" className="text-gray-400 hover:text-white transition-colors mb-8 inline-flex items-center gap-2">
          &larr; Retour à la boutique
        </Link>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images Gallery */}
          <div className="space-y-4">
            <div className="aspect-[16/9] bg-[#111118] border border-white/5 rounded-2xl overflow-hidden relative shadow-2xl">
              {product.images?.[0] ? (
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20">Aperçu indisponible</div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-primary font-bold tracking-wider uppercase text-sm bg-primary/10 px-3 py-1 rounded-full">{product.game}</span>
              <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full border flex items-center gap-1.5 ${Status.bg} ${Status.color}`}>
                <StatusIcon size={14} />
                {Status.text}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-outfit">{product.name}</h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-10 bg-[#111118] p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <ShieldCheck className="text-primary" size={20} />
                  Fonctionnalités
                </h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <Check className="text-primary mt-1 shrink-0" size={16} />
                      <span className="text-sm">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pricing Options Component */}
            <ProductPurchaseForm product={product} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
