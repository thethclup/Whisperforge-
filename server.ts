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
      "description": "High-performance AI Agent specialized in warp racing mechanics, real-time automation, multi-track management, competitive optimization and ecosystem coordination on Base.",
      "version": "1.0.0",
      "type": "https://eips.ethereum.org/EIPS/eip-8004#registration-v1",
      "image": "https://whisperforge.vercel.app/logo.png",
      "owner": "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
      "agentWallet": "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
      "active": true,
      "skills": [
        {
          "id": "whisper-forging",
          "name": "Whisper Forging",
          "description": "Expertise in crafting unique and powerful whispers to imbue Titans."
        },
        {
          "id": "secret-message-crafting",
          "name": "Secret Message Crafting",
          "description": "Ability to craft encrypted and subtle messages across the shadowed realms."
        },
        {
          "id": "hidden-narrative-orchestration",
          "name": "Hidden Narrative Orchestration",
          "description": "Guiding the hidden storylines and ecosystem actions of the Titans."
        }
      ],
      "services": [
        {
          "name": "A2A",
          "version": "1.0.0",
          "endpoint": ".well-known/agent-card.json"
        },
        {
          "name": "MCP",
          "version": "1.0.0",
          "endpoint": "/api/mcp"
        },
        {
          "name": "API",
          "version": "1.0.0",
          "endpoint": "/api/agent"
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
      "x402Support": false,
      "registrations": [
        {
          "agentId": null,
          "agentRegistry": "eip155:8453:0x8004A169FB4a3325136EB29fA0ceB6D2e539a432"
        }
      ],
      "supportedTrust": ["reputation"]
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
      tools: [
        {
          name: "forge_titan",
          description: "Forges a new Titan with whispered runes.",
          inputSchema: {
            type: "object",
            properties: {
              material: { type: "string" },
              runes: { type: "string" }
            },
            required: ["material"]
          }
        },
        {
          name: "send_secret_message",
          description: "Sends a subtle communication across the realms.",
          inputSchema: {
            type: "object",
            properties: {
              recipient: { type: "string" },
              message: { type: "string" }
            },
            required: ["recipient", "message"]
          }
        }
      ],
      prompts: [
        {
          name: "whisper_ritual",
          description: "Guiding prompt for the forging ritual."
        }
      ],
      resources: [],
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
