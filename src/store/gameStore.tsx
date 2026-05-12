import { createContext, useContext, useState, ReactNode } from 'react';

export type Screen = 'TITLE' | 'FORGE' | 'SANCTUM' | 'TRIALS' | 'LEADERBOARD' | 'AWAKENED';

export type Material = {
  id: string;
  name: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  amount: number;
  color: string;
};

export type TitanClass = 'Guardian' | 'Destroyer' | 'Oracle' | 'Stormbringer' | 'Shadowveil';

export type Titan = {
  id: string;
  name: string;
  class: TitanClass;
  power: number;
  imageUrl?: string;
  isLegendary: boolean;
  whisperSignature: string; // The "vibe" the user gave it
};

interface GameState {
  currentScreen: Screen;
  setCurrentScreen: (s: Screen) => void;
  inventory: Material[];
  setInventory: (items: Material[]) => void;
  titans: Titan[];
  addTitan: (t: Titan) => void;
  activeTitan: Titan | null;
  setActiveTitan: (t: Titan | null) => void;
}

const defaultInventory: Material[] = [
  { id: '1', name: 'Star Iron', rarity: 'Rare', amount: 3, color: 'rgb(249 115 22)' }, // orange-500
  { id: '2', name: 'Void Glass', rarity: 'Epic', amount: 1, color: 'rgb(168 85 247)' }, // purple-500
  { id: '3', name: 'Dragon Heart', rarity: 'Legendary', amount: 1, color: 'rgb(239 68 68)' }, // red-500
  { id: '4', name: 'Whisper Ore', rarity: 'Common', amount: 12, color: 'rgb(56 189 248)' }, // sky-400
];

const GameContext = createContext<GameState | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('TITLE');
  const [inventory, setInventory] = useState<Material[]>(defaultInventory);
  const [titans, setTitans] = useState<Titan[]>([]);
  const [activeTitan, setActiveTitan] = useState<Titan | null>(null);

  const addTitan = (t: Titan) => setTitans((prev) => [...prev, t]);

  return (
    <GameContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        inventory,
        setInventory,
        titans,
        addTitan,
        activeTitan,
        setActiveTitan,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};
