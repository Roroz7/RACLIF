import { prisma } from '@/lib/prisma';
import { Shield, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 font-outfit">Utilisateurs</h1>
        <p className="text-gray-400">Gestion des utilisateurs inscrits.</p>
      </div>

      <div className="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">Utilisateur</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">Rôle</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">Discord</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">Inscription</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold">{user.username}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full border flex w-fit items-center gap-1.5 ${
                      user.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                      user.role === 'RESELLER' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      'bg-gray-500/10 text-gray-400 border-gray-500/20'
                    }`}>
                      {user.role === 'ADMIN' && <Shield size={14} />}
                      {user.role === 'RESELLER' && <ShieldAlert size={14} />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.isDiscordLinked ? (
                      <span className="flex items-center gap-1 text-sm text-green-400"><CheckCircle size={14} /> Lié</span>
                    ) : (
                      <span className="flex items-center gap-1 text-sm text-red-400"><XCircle size={14} /> Non lié</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                     <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">Gérer</button>
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
