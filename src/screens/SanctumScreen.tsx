import { useGame } from '../store/gameStore';
import { motion } from 'motion/react';
import { Shield, Zap } from 'lucide-react';

export default function SanctumScreen() {
  const { titans } = useGame();

  if (titans.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 rounded-full border border-dashed border-white/20 flex items-center justify-center mb-6">
            <Shield className="text-zinc-600" size={32} />
        </div>
        <h2 className="text-2xl font-serif text-white mb-2">Sanctum Empty</h2>
        <p className="text-zinc-500 text-sm font-mono max-w-[200px]">
          Return to the Forge and whisper life into metal.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 overflow-y-auto">
      <h2 className="text-2xl font-serif text-white mb-6 sticky top-0 bg-zinc-950/80 backdrop-blur-sm py-2 z-10 px-2 border-b border-white/5">
        Titan Army
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        {titans.map((titan, i) => (
          <motion.div
            key={titan.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="aspect-[3/4] bg-zinc-900/50 rounded-2xl border border-white/5 p-3 flex flex-col relative overflow-hidden group"
          >
            {titan.isLegendary && (
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />
            )}
            <div className="flex-1 flex items-center justify-center relative">
               <div className="w-16 h-24 bg-zinc-800 rounded-t-full rounded-b-lg border border-white/5 group-hover:scale-105 transition-transform" />
            </div>
            <div className="mt-2">
              <h3 className="text-sm font-bold text-white truncate">{titan.name}</h3>
              <div className="flex justify-between items-center mt-1">
                 <span className="text-[10px] text-zinc-400 font-mono">{titan.class}</span>
                 <span className="text-xs text-orange-400 font-bold flex items-center gap-1">
                    <Zap size={10} /> {titan.power}
                 </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
