import { prisma } from '@/lib/prisma';
import { ExternalLink } from 'lucide-react';

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { username: true, email: true } },
      product: { select: { name: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 font-outfit">Commandes</h1>
        <p className="text-gray-400">Historique complet des transactions.</p>
      </div>

      <div className="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">ID</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">Client</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">Produit</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">Montant</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">Statut</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-gray-400">
                    {order.id.slice(0, 8)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{order.user.username}</div>
                    <div className="text-xs text-gray-500">{order.user.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">{order.product.name}</td>
                  <td className="px-6 py-4 font-bold">{order.totalAmount}€</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
                      order.status === 'PAID' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      order.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
