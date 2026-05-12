import { motion } from 'motion/react';
import { Skull, Swords } from 'lucide-react';

export default function TrialsScreen() {
  return (
    <div className="flex-1 flex flex-col p-6 items-center justify-center text-center">
      <motion.div
         animate={{ y: [0, -10, 0] }}
         transition={{ duration: 4, repeat: Infinity }}
         className="w-32 h-32 rounded-full border border-red-500/30 bg-red-950/20 flex flex-col items-center justify-center mb-8 relative"
      >
         <div className="absolute inset-0 bg-red-500/10 rounded-full blur-xl animate-pulse" />
         <Skull size={40} className="text-red-500 mb-2" />
      </motion.div>
      
      <h2 className="text-3xl font-serif text-white mb-4">Shattered Realms</h2>
      <p className="text-zinc-400 text-sm font-mono leading-relaxed mb-8 max-w-[260px]">
        Deploy your Titans to gather rare materials. Only the strongest survive the void.
      </p>
      
      <button className="px-6 py-3 rounded-xl bg-zinc-900 border border-white/5 text-zinc-300 font-bold flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
         <Swords size={18} />
         Trials unlock at 5 Titans
      </button>
    </div>
  );
}
