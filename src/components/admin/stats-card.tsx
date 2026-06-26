export function StatsCard({ title, value, icon: Icon, trend, trendValue }: any) {
  const isPositive = trend === 'up';
  return (
    <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-primary/30 transition-colors">
      <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
        <Icon size={100} />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4 text-gray-400">
          <Icon size={20} className="text-primary" />
          <h3 className="font-medium">{title}</h3>
        </div>
        <div className="text-3xl font-bold text-white mb-2">{value}</div>
        {trendValue && (
          <div className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '↑' : '↓'} {trendValue}
          </div>
        )}
      </div>
    </div>
  );
}
