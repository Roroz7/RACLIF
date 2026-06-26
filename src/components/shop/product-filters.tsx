"use client";

import { useRouter, useSearchParams } from 'next/navigation';

export function ProductFilters({ games }: { games: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleGameChange = (game: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (game === 'all') {
      params.delete('game');
    } else {
      params.set('game', game);
    }
    router.push(`/shop?${params.toString()}`);
  };

  const currentGame = searchParams.get('game') || 'all';

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => handleGameChange('all')}
        className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currentGame === 'all' ? 'bg-primary text-white shadow-[0_0_15px_-3px_rgba(139,92,246,0.4)]' : 'bg-[#111118] border border-white/5 text-gray-400 hover:text-white hover:border-white/20'}`}
      >
        Tous les jeux
      </button>
      {games.map(game => (
        <button
          key={game}
          onClick={() => handleGameChange(game)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currentGame === game ? 'bg-primary text-white shadow-[0_0_15px_-3px_rgba(139,92,246,0.4)]' : 'bg-[#111118] border border-white/5 text-gray-400 hover:text-white hover:border-white/20'}`}
        >
          {game}
        </button>
      ))}
    </div>
  );
}
