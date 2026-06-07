import { useGame } from './store/gameStore';
import TitleScreen from './screens/TitleScreen';
import ForgeScreen from './screens/ForgeScreen';
import SanctumScreen from './screens/SanctumScreen';
import TrialsScreen from './screens/TrialsScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import AwakenedScreen from './screens/AwakenedScreen';
import { Navbar } from './components/Navbar';
import { useAccount, useSendTransaction } from 'wagmi';
import { Sun } from 'lucide-react';
import { parseEther } from 'viem';

export default function App() {
  const { currentScreen } = useGame();
  const { isConnected } = useAccount();
  const { sendTransaction, isPending } = useSendTransaction();

  const sendGMTransaction = () => {
    sendTransaction({
      to: '0xc35B9997B63B1CE14f8F513f7eddD9a7ABbB33d7',
      value: parseEther('0'),
      data: '0x' // basic transaction
    });
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'TITLE':
        return <TitleScreen />;
      case 'FORGE':
        return <ForgeScreen />;
      case 'SANCTUM':
        return <SanctumScreen />;
      case 'TRIALS':
        return <TrialsScreen />;
      case 'LEADERBOARD':
        return <LeaderboardScreen />;
      case 'AWAKENED':
        return <AwakenedScreen />;
      default:
        return <TitleScreen />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative overflow-hidden bg-zinc-950 shadow-2xl">
      {currentScreen !== 'TITLE' && <Navbar />}
      <main className="flex-1 relative z-10 w-full flex flex-col pt-16">
        {renderScreen()}
      </main>
      
      {/* Global Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-900/20 rounded-full blur-[100px]" />
         <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
      </div>

      {isConnected && (
        <div className="absolute bottom-4 left-4 z-50">
          <button 
            onClick={sendGMTransaction}
            disabled={isPending}
            className="px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-xs font-bold"
          >
            <Sun className="w-4 h-4" />
            {isPending ? 'Sending...' : 'Say GM'}
          </button>
        </div>
      )}
    </div>
  );
}
