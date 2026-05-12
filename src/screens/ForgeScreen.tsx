import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGame, Material } from '../store/gameStore';
import { Flame, Wind, Droplets } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAccount } from 'wagmi';

export default function ForgeScreen() {
  const { inventory, setCurrentScreen, setActiveTitan } = useGame();
  const [selectedMat, setSelectedMat] = useState<Material | null>(null);
  const [isForging, setIsForging] = useState(false);
  const [forgingProgress, setForgingProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isConnected } = useAccount();

  // Simple particle system for the forge
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: {x: number, y: number, vx: number, vy: number, size: number, life: number, color: string}[] = [];

    const render = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      // Add new particles if forging or just ambient
      if (Math.random() < (isForging ? 0.8 : 0.1)) {
        particles.push({
          x: ctx.canvas.width / 2 + (Math.random() * 40 - 20),
          y: ctx.canvas.height - 20,
          vx: (Math.random() - 0.5) * (isForging ? 4 : 1),
          vy: -(Math.random() * (isForging ? 6 : 2)) - 1,
          size: Math.random() * 3 + 1.5,
          life: 1.0,
          color: selectedMat ? selectedMat.color : 'rgb(249 115 22)'
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= isForging ? 0.015 : 0.01;
        p.size *= 0.98;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
      }
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isForging, selectedMat]);

  const startForging = () => {
    if (!selectedMat) return;
    setIsForging(true);
    setForgingProgress(0);
    
    // Simulate whisper forging mini-game auto-completion for MVP
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setForgingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        finishForging();
      }
    }, 100);
  };

  const finishForging = () => {
    setIsForging(false);
    
    // Generate Titan
    const newTitan = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Titan of ${selectedMat?.name.split(' ')[0]}`,
      class: ['Guardian', 'Destroyer', 'Oracle'][Math.floor(Math.random() * 3)] as any,
      power: Math.floor(Math.random() * 1000) + 500,
      isLegendary: selectedMat?.rarity === 'Legendary',
      whisperSignature: "0xabc...def" // Dummy
    };
    
    setActiveTitan(newTitan);
    setCurrentScreen('AWAKENED');
  };

  return (
    <div className="flex-1 flex flex-col p-4 z-10 space-y-6">
      
      {/* The Anvil / Forge Canvas */}
      <div className="relative w-full aspect-square rounded-3xl border border-white/5 bg-zinc-900/50 shadow-inner overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/40 via-transparent to-transparent pointer-events-none" />
        
        <canvas 
          ref={canvasRef} 
          width={300} 
          height={300} 
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-80" 
        />

        <div className="z-10 text-center flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-zinc-800 bg-zinc-950 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.8)] relative">
             <Flame size={40} className={cn("transition-colors duration-500", isForging ? "text-white" : "text-zinc-600")} />
             {isForging && (
                <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-orange-400"
                    animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                 />
             )}
          </div>
          <h2 className="mt-4 font-serif text-2xl text-white drop-shadow-md">The Anvil of Souls</h2>
          <p className="text-zinc-500 text-sm font-mono mt-1">
            {isForging ? `Infusing ${forgingProgress}%` : "Awaiting Materials..."}
          </p>
        </div>

        {/* Progress Bar overlay */}
        <AnimatePresence>
          {isForging && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-6 left-6 right-6 h-2 bg-zinc-950 rounded-full overflow-hidden"
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-orange-600 to-yellow-400"
                style={{ width: `${forgingProgress}%` }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Materials Inventory (Draggable in real implementation) */}
      <div className="flex-1 bg-zinc-900/40 rounded-3xl border border-white/5 p-4 relative">
        <h3 className="font-mono text-zinc-400 text-xs mb-3 flex items-center gap-2">
           <Droplets size={14} /> Available Materials
        </h3>
        
        <div className="grid grid-cols-4 gap-3">
          {inventory.map((mat) => (
            <button
              key={mat.id}
              onClick={() => setSelectedMat(mat)}
              disabled={isForging || mat.amount === 0}
              className={cn(
                "aspect-square rounded-2xl flex flex-col items-center justify-center relative border transition-all duration-300",
                selectedMat?.id === mat.id 
                  ? "border-orange-500/50 bg-orange-500/10 scale-105 z-10 shadow-[0_0_20px_rgba(249,115,22,0.2)]" 
                  : "border-white/5 bg-black/40 hover:bg-white/5",
                mat.amount === 0 && "opacity-30 grayscale"
              )}
            >
              <div 
                className="w-8 h-8 rounded-full mb-1 blur-[1px]"
                style={{ background: mat.color, boxShadow: `0 0 10px ${mat.color}80` }}
              />
              <span className="text-[10px] font-mono text-center leading-tight px-1">{mat.name}</span>
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-zinc-800 rounded-full border border-white/10 text-[10px] flex items-center justify-center font-mono text-emerald-400">
                {mat.amount}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={startForging}
        disabled={!selectedMat || isForging}
        className="w-full py-5 rounded-2xl bg-zinc-800 text-white font-bold tracking-widest uppercase font-serif disabled:opacity-50 relative overflow-hidden group shadow-lg"
      >
         <div className={cn(
             "absolute inset-0 transition-opacity duration-300",
             selectedMat && !isForging ? "opacity-100" : "opacity-0",
             "bg-gradient-to-r from-orange-600 to-red-600"
         )} />
         <span className="relative z-10 flex items-center justify-center gap-2">
            <Wind size={20} />
            {isForging ? 'Whispering...' : (selectedMat ? 'Begin Ritual' : 'Select Material')}
         </span>
      </button>

    </div>
  );
}
