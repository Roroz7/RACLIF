import Link from "next/link";
import { Github, Twitter, DiscIcon as Discord } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-raclif-darkest py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-raclif-primary to-raclif-secondary flex items-center justify-center">
                <span className="font-bold text-white text-xl">R</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">Raclif</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Premium cheats and hacks for your favorite games. Undetected and frequently updated.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">Accueil</Link></li>
              <li><Link href="/shop" className="text-gray-400 hover:text-white text-sm transition-colors">Boutique</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white text-sm transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Légal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Conditions d'utilisation</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Politique de confidentialité</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Communauté</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-raclif-primary transition-colors">
                <Discord className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-raclif-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Raclif. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
