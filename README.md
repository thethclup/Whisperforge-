# Whisperforge Titans

An epic and mysterious forging game where you are the Whisper Smith, a legendary blacksmith who forges colossal Titans by whispering ancient runes into molten metal.

## Overview
Whisperforge Titans is an interactive web game optimized for mobile-first play:
- Drag materials into the forge.
- Perform ritualistic forging to imbue Titans.
- Claim Awakened Titans in your Sanctum.
- Engage in Shattered Realms trials.
- On-chain features over Base Mainnet: Strongest Titans Leaderboard.

## On-Chain Integrations
The application integrates securely with the **Base Mainnet** and utilizes Trustless Agents specifications.
- **Provider:** Wagmi & Viem 
- **ERC-8021 Configured:** Tracks transactions effectively via attribution.
- **ERC-8004 AI Agents:** Advanced agent integrations over the `/.well-known/agent-card.json`, `/api/mcp`, and `/api/agent` endpoints.

## Setup & Deployment
The app is a React+Vite app working seamlessly with an Express server to expose necessary agent endpoints. 
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Execute build: `npm run build`
4. Start production server: `npm run start`

**Note:** No sensitive keys are baked into the repository. Configure your `.env` properly.
