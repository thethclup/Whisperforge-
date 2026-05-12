import { motion } from 'motion/react';
import { useGame } from '../store/gameStore';

export default function TitleScreen() {
  const { setCurrentScreen } = useGame();

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full h-80 relative flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-600/40 via-zinc-950/20 to-transparent blur-xl" />
        
        {/* Placeholder for Cinematic Titan Asset - In a real game, this would be a Canvas or WebGL scene */}
        <motion.div 
            animate={{ 
                y: [0, -10, 0],
                rotate: [0, 1, -1, 0]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="w-48 h-64 bg-zinc-800 rounded-[4rem] border-2 border-orange-500/50 shadow-[0_0_50px_rgba(249,115,22,0.4)] flex justify-center items-center overflow-hidden relative"
        >
            <div className="absolute top-10 w-16 h-16 bg-white/10 rounded-full blur-md" />
            <div className="w-8 h-24 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full blur-[2px] opacity-80" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] text-orange-400 tracking-widest uppercase">
                Whisperforge
            </div>
        </motion.div>

        {/* Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-1 h-1 bg-orange-400 rounded-full"
                animate={{
                    y: [100, -200],
                    x: Math.random() * 200 - 100,
                    opacity: [0, 1, 0],
                    scale: [0, Math.random() * 2 + 1, 0]
                }}
                transition={{
                    duration: Math.random() * 2 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                }}
            />
        ))}

      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center mt-12 z-10"
      >
        <h1 className="text-4xl font-serif font-bold bg-gradient-to-b from-white to-orange-200 bg-clip-text text-transparent drop-shadow-sm mb-2">
          Whisperforge Titans
        </h1>
        <p className="text-zinc-400 font-mono text-sm tracking-wide mb-12">
          Awaken the Colossal
        </p>

        <button
          onClick={() => setCurrentScreen('FORGE')}
          className="relative px-12 py-4 rounded-full font-bold uppercase tracking-widest text-lg overflow-hidden group/btn"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 transition-transform group-hover/btn:scale-105" />
          <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 bg-white mix-blend-overlay transition-opacity" />
          <span className="relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-white">Enter the Forge</span>
        </button>
      </motion.div>
    </div>
  );
}
