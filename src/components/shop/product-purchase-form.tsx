"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function ProductPurchaseForm({ product }: { product: any }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedPriceId, setSelectedPriceId] = useState<string>(
    product.prices[0]?.id || ""
  );

  const handlePurchase = () => {
    if (!session) {
      router.push(`/login?callbackUrl=/shop/${product.id}`);
      return;
    }
    // redirect to checkout route or show modal
    alert("Redirection vers le paiement Stripe en construction...");
  };

  return (
    <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold mb-6 text-white">Sélectionnez une durée</h3>
      
      <div className="space-y-3 mb-6">
        {product.prices.length > 0 ? product.prices.map((price: any) => (
          <label 
            key={price.id} 
            className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${selectedPriceId === price.id ? 'border-primary bg-primary/10 shadow-[0_0_20px_-5px_rgba(139,92,246,0.2)]' : 'border-white/5 hover:border-white/20 bg-[#1A1A2E]/50'}`}
          >
             <div className="flex items-center gap-3">
               <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPriceId === price.id ? 'border-primary' : 'border-gray-500'}`}>
                 {selectedPriceId === price.id && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
               </div>
               <span className="font-medium text-white">{price.label}</span>
             </div>
             <span className="font-bold text-xl text-white">{price.amount}€</span>
          </label>
        )) : (
          <div className="text-gray-500 italic p-4 border border-dashed border-white/10 rounded-xl text-center">Aucun prix configuré pour ce produit.</div>
        )}
      </div>

      <button 
        disabled={product.prices.length === 0}
        onClick={handlePurchase}
        className="w-full py-4 rounded-xl font-bold text-lg bg-primary hover:bg-primary/90 text-white transition-all shadow-[0_0_20px_-5px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
      >
        Passer à l'achat
      </button>
      
      {!session && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Vous devez être connecté pour finaliser l'achat.
        </p>
      )}
    </div>
  );
}
