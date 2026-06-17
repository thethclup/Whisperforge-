import { http, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'
import { injected, metaMask, safe, baseAccount } from 'wagmi/connectors'

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected(),
    baseAccount({
      appName: 'Whisperforge Titans',
    }),
    metaMask(),
    safe(),
  ],
  transports: {
    [base.id]: http(),
  },
})
