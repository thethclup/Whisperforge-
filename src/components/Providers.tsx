'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '../lib/wagmi'
import { GameProvider } from '../store/gameStore'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <GameProvider>
          {children}
        </GameProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
