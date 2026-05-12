import React from 'react';
import { useGame, Screen } from '../store/gameStore';
import { Hammer, Users, Shield, Trophy } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAccount, useConnect } from 'wagmi';
import { metaMask } from 'wagmi/connectors';

export function Navbar() {
  const { currentScreen, setCurrentScreen } = useGame();
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();

  const navItems: { id: Screen; label: string; icon: React.FC<any> }[] = [
    { id: 'FORGE', label: 'Forge', icon: Hammer },
    { id: 'SANCTUM', label: 'Sanctum', icon: Users },
    { id: 'TRIALS', label: 'Trials', icon: Shield },
    { id: 'LEADERBOARD', label: 'Ranks', icon: Trophy },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 max-w-md mx-auto z-50 p-4">
      <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-white/10 p-2 flex items-center justify-between shadow-2xl shadow-black/50">
        <div className="flex gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={cn(
                  "p-2 rounded-xl transition-all duration-300",
                  active ? "bg-orange-500/20 text-orange-400" : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                )}
                title={item.label}
              >
                <Icon size={20} className={cn(active && "drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]")} />
              </button>
            );
          })}
        </div>
        
        <button 
          onClick={() => connect({ connector: metaMask() })}
          className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/40 transition-colors"
        >
          {isConnected ? `${address?.slice(0, 6)}...` : 'Connect Base'}
        </button>
      </div>
    </div>
  );
}
