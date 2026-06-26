import Link from "next/link";
import { User, LogOut, Settings, ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-raclif-primary to-raclif-secondary flex items-center justify-center">
            <span className="font-bold text-white text-xl">R</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Raclif</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Accueil</Link>
          <Link href="/shop" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Boutique</Link>
          <Link href="/faq" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">FAQ</Link>
        </div>

        <div className="flex items-center space-x-4">
           {/* On ajoutera la logique d'authentification plus tard */}
          <Link href="/login" className="hidden md:flex text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Connexion
          </Link>
          <Link href="/register" className="bg-raclif-primary hover:bg-raclif-secondary text-white text-sm font-medium px-4 py-2 rounded-md transition-all shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.7)]">
            S'inscrire
          </Link>
        </div>
      </div>
    </nav>
  );
}
