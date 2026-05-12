import { useGame } from './store/gameStore';
import TitleScreen from './screens/TitleScreen';
import ForgeScreen from './screens/ForgeScreen';
import SanctumScreen from './screens/SanctumScreen';
import TrialsScreen from './screens/TrialsScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import AwakenedScreen from './screens/AwakenedScreen';
import { Navbar } from './components/Navbar';

export default function App() {
  const { currentScreen } = useGame();

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
    </div>
  );
}
