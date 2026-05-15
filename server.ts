import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. .well-known/agent-card.json
  app.get("/.well-known/agent-card.json", (req, res) => {
    res.json({
      "name": "Whisper Forge Orchestrator",
      "description": "Whisper Forge platformunda çalışan ERC-8004 uyumlu AI Agent. Whisper forging, secret message crafting, subtle communication ve hidden narrative orchestration yapan gizemli ve usta orchestrator.",
      "version": "1.0.0",
      "type": "https://eips.ethereum.org/EIPS/eip-8004#registration-v1",
      "image": "https://whisperforge.vercel.app/logo.png",
      "wallets": {
        "base": "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6"
      },
      "services": [
        {
          "name": "A2A",
          "endpoint": "https://whisperforge.vercel.app/.well-known/agent-card.json",
          "version": "1.0.0"
        },
        {
          "name": "MCP",
          "endpoint": "https://whisperforge.vercel.app/api/mcp",
          "version": "1.0.0"
        },
        {
          "name": "API",
          "endpoint": "https://whisperforge.vercel.app/api/agent",
          "version": "1.0.0"
        }
      ],
      "capabilities": [
        "whisper-forging",
        "secret-message-crafting",
        "subtle-communication",
        "hidden-narrative-orchestration",
        "silent-influence",
        "encrypted-thought-management",
        "mcp-command-execution"
      ],
      "supportedChains": ["eip155:8453"],
      "active": true,
      "status": "online"
    });
  });

  // 2. /api/mcp
  app.get("/api/mcp", (req, res) => {
    res.json({
      protocol: "MCP",
      version: "1.0.0",
      name: "Whisper Forge MCP Endpoint",
      status: "active",
      description: "Active MCP server for Whisper Forge Orchestrator",
      capabilities: ["whisper-forging", "secret-message-crafting", "subtle-communication"],
      timestamp: new Date().toISOString()
    });
  });

  app.post("/api/mcp", (req, res) => {
    try {
      const body = req.body;
      const { action, command, params, task } = body;

      const cmd = (action || command || task || "").toLowerCase();

      let result: any = {};

      switch (cmd) {
        case "status":
        case "ping":
          result = { 
            status: "online", 
            agent: "Whisper Forge Orchestrator",
            message: "The forge is quiet... but listening" 
          };
          break;

        case "execute":
          result = {
            success: true,
            executed: params || command,
            executedAt: new Date().toISOString(),
            message: "Whisper successfully forged"
          };
          break;

        case "get_info":
          result = {
            name: "Whisper Forge Orchestrator",
            wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
            platform: "Base",
            version: "1.0.0"
          };
          break;

        default:
          result = {
            success: true,
            message: "Whisper received",
            data: body
          };
      }

      res.json({
        status: "success",
        agent: "Whisper Forge Orchestrator",
        response: result,
        receivedAt: new Date().toISOString()
      });

    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "Failed to forge the whisper"
      });
    }
  });

  // 3. /api/agent
  app.get("/api/agent", (req, res) => {
    res.json({
      name: "Whisper Forge Orchestrator",
      description: "Master forger of whispers and hidden messages",
      status: "active",
      wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
      platform: "Whisper Forge",
      version: "1.0.0",
      type: "ERC-8004 Agent",
      lastUpdated: new Date().toISOString()
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
