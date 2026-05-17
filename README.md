# 🗡️ Whisperforge Titans

> *The forge is quiet... but it listens. Step into the shadows and awaken the colossal.*

**Whisperforge Titans** is an epic, mysterious mobile-first web game built on **Base Mainnet**. Play as the mythical *Whisper Smith*, gathering rare materials and performing ritualistic forging sequences to breathe life into legendary Titans.

## 🌟 Game Highlights

- **The Ritual of Forging:** Combine materials like *Star Iron*, *Void Glass*, and *Dragon Heart*.
- **Whisper Synergy:** Your timing and the "runes" you whisper shape your Titan's stats and class (*Guardian*, *Destroyer*, *Oracle*, *Stormbringer*, *Shadowveil*).
- **Titan Sanctum:** Curate and manage your collection of awakened Titans. 
- **Shattered Realms Trials:** Send your creations into the void to test their mettle.
- **On-chain Attributions:** Showcases the strongest Titans and tracks all forging activity on Base Mainnet.

## 🤖 ERC-8004 Trustless AI Agent

Whisperforge incorporates a fully compliant **ERC-8004 Trustless Agent** (The Orchestrator) responsible:
- **A2A (Agent-to-Agent):** Discovery powered by `.well-known/agent-card.json`.
- **MCP Integration:** An active MCP server handling secure commands like `forge_titan` and `send_secret_message` at `/api/mcp`.
- **API Status:** Live telemetry available via `/api/agent`.

*(Our agent seamlessly coordinates hidden narrative updates and real-time optimizations across the ecosystem.)*

## 🛠️ Build & Development

This project leverages modern frontend architecture (React + Vite) coupled with an Express backend for secure agent routing. 

```bash
# Provide dependencies
npm install

# Start local test forge (Development)
npm run dev

# Craft for production
npm run build && npm start
```

### Security Notice
*Whisperforge Titans maintains strict operational security. Never commit or leak your wallet private keys, API secrets, or `.env` configurations. Base integrations are client-side signed via SIWE (Sign-In with Ethereum), ensuring trustless interactions.*
