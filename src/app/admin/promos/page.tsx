import { prisma } from '@/lib/prisma';
import { Tag, Plus, Edit2, Trash2 } from 'lucide-react';

export default async function AdminPromosPage() {
  const promos = await prisma.promoCode.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 font-outfit">Codes Promo</h1>
          <p className="text-gray-400">Gestion des réductions et offres.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_15px_-3px_rgba(139,92,246,0.4)]">
          <Plus size={18} />
          Nouveau Code
        </button>
      </div>

      <div className="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">Code</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">Réduction</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">Utilisations</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">Statut</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {promos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500 italic">
                    Aucun code promo trouvé.
                  </td>
                </tr>
              ) : promos.map((promo) => (
                <tr key={promo.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-md border border-primary/20">
                      {promo.code}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold">
                    {promo.value}{promo.type === 'PERCENTAGE' ? '%' : '€'}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {promo.currentUses} {promo.maxUses ? `/ ${promo.maxUses}` : '(Illimité)'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
                      promo.isActive ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {promo.isActive ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                        <Trash2 size={16} />
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
