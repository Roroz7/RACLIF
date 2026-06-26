import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Key, ShoppingBag, Disc as Discord, CheckCircle, XCircle } from 'lucide-react';

export const metadata = {
  title: 'Dashboard - Raclif',
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
    include: {
      licenses: {
        include: { product: true },
        orderBy: { createdAt: 'desc' }
      },
      orders: {
        include: { product: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex flex-col">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 max-w-7xl mx-auto flex-grow w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 font-outfit">Tableau de bord</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar Profil */}
          <div className="space-y-6">
            <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold border border-primary/30 shadow-[0_0_15px_-3px_rgba(139,92,246,0.5)]">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{user.username}</h2>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Discord size={18} className="text-[#5865F2]" />
                    <span className="font-medium">Discord</span>
                  </div>
                  {user.isDiscordLinked ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/20">
                      <CheckCircle size={14} /> LIÉ
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
                      <XCircle size={14} /> NON LIÉ
                    </span>
                  )}
                </div>

                {!user.isDiscordLinked && (
                  <button className="w-full py-2.5 mt-2 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium transition-colors flex items-center justify-center gap-2">
                    <Discord size={18} />
                    Lier mon Discord
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Contenu Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Licences Actives */}
            <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Key className="text-primary" /> Mes Licences
              </h3>
              
              {user.licenses.length > 0 ? (
                <div className="space-y-4">
                  {user.licenses.map((license) => (
                    <div key={license.id} className="p-5 border border-white/10 rounded-xl bg-[#1A1A2E]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/30 transition-colors">
                      <div>
                        <div className="font-bold text-lg mb-2">{license.product.name}</div>
                        <code className="text-sm text-primary font-mono bg-primary/10 px-3 py-1.5 rounded-md border border-primary/20">
                          {license.key}
                        </code>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className={`text-sm font-bold mb-1 ${
                          license.status === 'ACTIVE' ? 'text-green-400' :
                          license.status === 'UNUSED' ? 'text-gray-400' :
                          'text-red-400'
                        }`}>
                          {license.status === 'UNUSED' ? 'Non utilisée' : 
                           license.status === 'ACTIVE' ? 'Active' : 
                           license.status === 'EXPIRED' ? 'Expirée' : 'Révoquée'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {license.expiresAt ? `Expire le ${new Date(license.expiresAt).toLocaleDateString()}` : 'Lifetime'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 italic">Vous n'avez aucune licence pour le moment.</p>
                </div>
              )}
            </div>

            {/* Historique des Commandes */}
            <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ShoppingBag className="text-primary" /> Historique des commandes
              </h3>

              {user.orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 text-sm">
                        <th className="pb-3 font-medium px-2">ID</th>
                        <th className="pb-3 font-medium px-2">Produit</th>
                        <th className="pb-3 font-medium px-2">Date</th>
                        <th className="pb-3 font-medium px-2">Montant</th>
                        <th className="pb-3 font-medium px-2">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {user.orders.map(order => (
                        <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-2 text-sm text-gray-400 font-mono">{order.id.slice(0, 8)}...</td>
                          <td className="py-4 px-2 font-medium">{order.product.name}</td>
                          <td className="py-4 px-2 text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td className="py-4 px-2 font-bold">{order.totalAmount}€</td>
                          <td className="py-4 px-2">
                            <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
                              order.status === 'PAID' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                              order.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                              'bg-red-500/10 text-red-400 border-red-500/20'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 italic">Aucune commande trouvée.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
