import { prisma } from '@/lib/prisma';

export default async function AdminLogsPage() {
  const logs = await prisma.log.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 font-outfit">Logs Système</h1>
        <p className="text-gray-400">Historique des actions importantes.</p>
      </div>

      <div className="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">Date</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">Type</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">Message</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">User ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500 italic">
                    Aucun log pour le moment.
                  </td>
                </tr>
              ) : logs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
                      log.type === 'ERROR' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      log.type === 'PURCHASE' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      log.type === 'AUTH' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      'bg-gray-500/10 text-gray-400 border-gray-500/20'
                    }`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300 text-sm">
                    {log.message}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-500">
                    {log.userId || '-'}
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
