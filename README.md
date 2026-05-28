# 🗡️ Whisper Forge Orchestrator

> *High-performance AI Agent specialized in warp racing mechanics, real-time automation, multi-track management, competitive optimization and ecosystem coordination.*

The **Whisper Forge Orchestrator** is an epic, mysterious mobile-first web ecosystem built on **Base Mainnet**. This project incorporates a fully compliant **ERC-8004 Trustless Agent** responsible for guiding hidden storylines and ecosystem actions.

## 🌟 Capabilities

- **Warp Racing:** Real-time warp racing mechanics, speed optimization and competitive track management.
- **Multi-Track Orchestration:** Manage and synchronize multiple racing instances and tracks simultaneously.
- **Performance Optimization:** Analyze and optimize racing performance, timing and strategy in real-time.
- **Ecosystem Coordination:** Guiding hidden storylines and coordinating ecosystem actions.
- **Real-Time Automation:** Executing time-critical on-chain automated actions seamlessly.
- **Competitive Orchestration:** Orchestrating leaderboards and competitive ecosystem engagement safely.

## 🤖 ERC-8004 Trustless AI Agent

Whisper Forge integrates an **ERC-8004 Trustless Agent** that handles autonomous ecosystem interactions on Base Mainnet.

- **A2A (Agent-to-Agent):** Discovery powered by public `.well-known/agent-card.json`.
- **MCP Integration:** Next.js App Router API exposing MCP endpoints (`/api/mcp`) supporting standard MCP methods alongside tools like `get_race_status`, `start_race`, `get_leaderboard`, `optimize_speed`, and `get_track_info`.
- **Telemetry:** Real-time API status available via `/api/agent`.

## 🛠️ Build & Development

This repository represents the full web client, powered by Next.js App Router patterns, TypeScript, Tailwind CSS, and Web3 integrations.

### How to Run Locally

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production** 
   ```bash
   npm run build && npm start
   ```

### MCP Connection Guide

To connect local or external agents to the Whisper Forge Orchestrator MCP:
1. Ensure the app is running locally or deployed.
2. Point your MCP client to: `https://whisperforge.vercel.app/api/mcp`
3. Send a POST request with the JSON-RPC payload representing `tools/list`, `prompts/list` or `tools/call`.
4. Ensure your client adheres to standard MCP JSON-RPC protocols.

---
*Note: Public repository contains no wallet private keys or secrets. All interactions use secure SIWE and proxy standards.*

