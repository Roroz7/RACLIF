import { prisma } from '@/lib/prisma';
import { Key, ShieldOff, RefreshCw } from 'lucide-react';

export default async function AdminLicensesPage() {
  const licenses = await prisma.license.findMany({
    include: {
      product: { select: { name: true } },
      user: { select: { username: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 font-outfit">Licences</h1>
          <p className="text-gray-400">Toutes les clés de licences générées.</p>
        </div>
        <button className="bg-[#111118] border border-white/5 hover:border-white/20 text-white px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2">
          <Key size={18} />
          Générer en masse
        </button>
      </div>

      <div className="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">Clé</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">Produit</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">Utilisateur</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">Statut</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {licenses.map((license) => (
                <tr key={license.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">
                      {license.key}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{license.product.name}</td>
                  <td className="px-6 py-4 text-gray-300">
                    {license.user ? license.user.username : <span className="text-gray-600 italic">Non assigné</span>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
                      license.status === 'ACTIVE' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      license.status === 'UNUSED' ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' :
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {license.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition-colors" title="Reset HWID">
                        <RefreshCw size={16} />
                      </button>
                      <button className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors" title="Révoquer">
                        <ShieldOff size={16} />
                      </button>
                    </div>
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
