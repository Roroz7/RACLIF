"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Key, 
  Users, 
  Tag, 
  ShoppingCart, 
  FileText,
  LogOut
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Produits', href: '/admin/products', icon: Package },
  { name: 'Licences', href: '/admin/licenses', icon: Key },
  { name: 'Commandes', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Utilisateurs', href: '/admin/users', icon: Users },
  { name: 'Promos', href: '/admin/promos', icon: Tag },
  { name: 'Logs', href: '/admin/logs', icon: FileText },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#111118] border-r border-white/5 h-screen sticky top-0 flex-col hidden lg:flex">
      <div className="h-24 flex items-center px-8 border-b border-white/5 shrink-0">
        <Link href="/" className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 font-outfit">
          RACLIF<span className="text-white">.ADMIN</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                (isActive && item.href !== '/admin') || (item.href === '/admin' && pathname === '/admin')
                  ? 'bg-primary text-white shadow-[0_0_15px_-3px_rgba(139,92,246,0.4)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/5 shrink-0">
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
