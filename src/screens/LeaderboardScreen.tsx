import { Trophy, ChevronUp } from 'lucide-react';
import { useAccount, useWriteContract } from 'wagmi';

export default function LeaderboardScreen() {
    const { isConnected } = useAccount();
    const { writeContract, isPending } = useWriteContract();

    // Mock Leaderboard Data
    const leaders = [
        { id: 1, address: '0x1234...abcd', power: 45000, name: 'Whisper Lord' },
        { id: 2, address: '0x8888...7777', power: 32000, name: 'Runesmith' },
        { id: 3, address: '0xabab...fefe', power: 28000, name: 'Void Crafter' },
    ];

    const sayGM = () => {
        if (!isConnected) {
            alert('Connect wallet first.');
            return;
        }
        alert("Sending GM on-chain... (Placeholder)");
        // e.g. writeContract({ ... })
    };

    return (
        <div className="flex-1 flex flex-col p-4">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 mt-4">
                <div>
                   <h2 className="text-2xl font-serif text-white flex items-center gap-2">
                       <Trophy className="text-yellow-500" size={24} /> 
                       Legends
                   </h2>
                   <p className="text-zinc-500 text-xs font-mono mt-1">Base Mainnet Titans</p>
                </div>
                
                <button 
                    onClick={sayGM}
                    disabled={isPending}
                    className="text-xs font-bold font-mono px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-md"
                >
                    {isPending ? '...' : `"Say GM"`}
                </button>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto pb-24">
                {leaders.map((leader, i) => (
                    <div key={leader.id} className="bg-zinc-900/40 border border-white/5 p-4 rounded-2xl flex items-center gap-4">
                        <span className="text-zinc-500 font-mono text-lg font-bold w-4">{i + 1}</span>
                        <div className="flex-1">
                            <h4 className="text-white font-bold">{leader.name}</h4>
                            <span className="text-xs text-zinc-500 font-mono">{leader.address}</span>
                        </div>
                        <div className="text-right">
                           <div className="text-orange-400 font-bold flex items-center justify-end gap-1">
                               <ChevronUp size={14} /> {leader.power}
                           </div>
                           <span className="text-[10px] text-zinc-500 font-mono uppercase">Power</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Attribution Code */}
            <div className="absolute bottom-24 left-0 right-0 text-center">
                <span className="text-zinc-700 font-mono text-[10px]">
                    ERC-8021 Builder: bc_sqn12hhe
                </span>
            </div>
        </div>
    );
}
