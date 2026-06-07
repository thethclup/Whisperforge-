import { motion } from 'motion/react';
import { useGame } from '../store/gameStore';
import { Shield, Zap, Info, ExternalLink } from 'lucide-react';
import { useAccount, useWriteContract } from 'wagmi';

export default function AwakenedScreen() {
  const { activeTitan, setCurrentScreen, addTitan } = useGame();
  const { isConnected } = useAccount();
  
  // Dummy contract writing setup
  const { writeContract, isPending } = useWriteContract();

  if (!activeTitan) {
    setCurrentScreen('FORGE');
    return null;
  }

  const claimTitan = () => {
    addTitan(activeTitan);
    setCurrentScreen('SANCTUM');
  };

  const recordOnChain = async () => {
    if (!isConnected) {
        alert("Please connect your wallet first via the top right button.");
        return;
    }
    
    try {
        // This is a placeholder for the real Base Mainnet contract interaction.
        // It would implement ERC-8021 and ERC-8004 standards here.
        alert("Transaction initiated! Sign in your wallet. (Dummy)");
        // writeContract({...})
        addTitan(activeTitan);
        setCurrentScreen('SANCTUM');
    } catch (e) {
        console.error(e);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center p-6 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="text-center mt-4 mb-8"
      >
        <span className="text-orange-400 font-mono text-sm tracking-[0.2em] uppercase">
          Titan Awakened
        </span>
        <h2 className="text-4xl font-serif mt-2 bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
          {activeTitan.name}
        </h2>
      </motion.div>

      {/* Titan Visual Representation */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="w-full aspect-[3/4] max-w-[280px] bg-zinc-900 rounded-[2rem] border-2 border-white/10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-8"
      >
        {activeTitan.isLegendary && (
           <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-red-500/20 mix-blend-overlay" />
        )}
        
        {/* Placeholder Art */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <div className="w-32 h-48 bg-gradient-to-t from-zinc-800 to-zinc-700 rounded-t-full rounded-b-3xl relative border border-white/5 shadow-inner">
               <div className="absolute top-10 left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full blur-[2px] shadow-[0_0_15px_rgba(34,211,238,1)]" />
               <div className="absolute bottom-4 w-full px-4 flex justify-between">
                   <div className="w-8 h-12 bg-zinc-600 rounded-full" />
                   <div className="w-8 h-12 bg-zinc-600 rounded-full" />
               </div>
            </div>
        </div>

        {/* Stats Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 pt-12">
            <div className="flex justify-between items-end">
                <div>
                   <span className="text-xs text-zinc-400 font-mono">Class</span>
                   <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                       <Shield size={14} className="text-orange-400" />
                       {activeTitan.class}
                   </div>
                </div>
                <div className="text-right">
                   <span className="text-xs text-zinc-400 font-mono">Power</span>
                   <div className="flex items-center gap-1.5 text-xl font-bold font-serif text-white">
                       <Zap size={16} className="text-cyan-400" />
                       {activeTitan.power}
                   </div>
                </div>
            </div>
        </div>
      </motion.div>

      <div className="w-full space-y-4 max-w-[280px]">
        <button 
          onClick={recordOnChain}
          disabled={isPending}
          className="w-full py-4 rounded-xl font-mono text-sm font-bold flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all"
        >
          {isPending ? 'Signing...' : (
             <>
               <ExternalLink size={16} /> Record This Creation on-chain
             </>
          )}
        </button>
        <button 
          onClick={claimTitan}
          className="w-full py-4 rounded-xl font-serif tracking-wide text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
        >
          Keep to Sanctum
        </button>
      </div>
      
    </div>
  );
}
