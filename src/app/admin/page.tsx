import { prisma } from '@/lib/prisma';
import { StatsCard } from '@/components/admin/stats-card';
import { ChartRevenue } from '@/components/admin/chart-revenue';
import { 
  Banknote, 
  ShoppingCart, 
  Users, 
  Key 
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const [
    totalUsers,
    totalOrders,
    totalRevenue,
    activeLicenses
  ] = await Promise.all([
    prisma.user.count(),
    prisma.order.count({ where: { status: 'PAID' } }),
    prisma.order.aggregate({
      where: { status: 'PAID' },
      _sum: { totalAmount: true }
    }),
    prisma.license.count({ where: { status: 'ACTIVE' } })
  ]);

  // Mock revenue data for chart
  const revenueData = [
    { date: 'Lun', revenue: 120 },
    { date: 'Mar', revenue: 300 },
    { date: 'Mer', revenue: 200 },
    { date: 'Jeu', revenue: 450 },
    { date: 'Ven', revenue: 500 },
    { date: 'Sam', revenue: 800 },
    { date: 'Dim', revenue: 600 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 font-outfit">Vue d'ensemble</h1>
        <p className="text-gray-400">Bienvenue sur le panel d'administration Raclif.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Revenus Totaux" 
          value={`${totalRevenue._sum.totalAmount || 0}€`}
          icon={Banknote}
          trend="up"
          trendValue="+15%"
        />
        <StatsCard 
          title="Ventes" 
          value={totalOrders}
          icon={ShoppingCart}
          trend="up"
          trendValue="+5%"
        />
        <StatsCard 
          title="Utilisateurs" 
          value={totalUsers}
          icon={Users}
          trend="up"
          trendValue="+12%"
        />
        <StatsCard 
          title="Licences Actives" 
          value={activeLicenses}
          icon={Key}
          trend="up"
          trendValue="+2%"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#111118] border border-white/5 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-bold mb-6">Revenus des 7 derniers jours</h3>
          <ChartRevenue data={revenueData} />
        </div>
        
        <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-bold mb-6">Activité Récente</h3>
          <div className="space-y-4">
            <div className="text-gray-500 italic text-center py-8">
              (Aucune activité récente pour le moment)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
