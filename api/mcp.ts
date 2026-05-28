export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const TOOLS = [
    {
      name: "get_race_status",
      description: "Get the current status of a warp race.",
      inputSchema: { type: "object", properties: { raceId: { type: "string" } }, required: ["raceId"] }
    },
    {
      name: "start_race",
      description: "Start a new warp race on a given track.",
      inputSchema: { type: "object", properties: { trackId: { type: "string" } }, required: ["trackId"] }
    },
    {
      name: "get_leaderboard",
      description: "Get the competitive leaderboard for racing.",
      inputSchema: { type: "object", properties: {}, required: [] }
    },
    {
      name: "optimize_speed",
      description: "Analyze and optimize racing performance.",
      inputSchema: { type: "object", properties: { profile: { type: "string" } }, required: [] }
    },
    {
      name: "get_track_info",
      description: "Get metrics and information about a specific warp track.",
      inputSchema: { type: "object", properties: { trackId: { type: "string" } }, required: ["trackId"] }
    }
  ];

  if (req.method === 'GET') {
    return res.status(200).json({
      protocol: "MCP",
      version: "1.0.0",
      name: "Whisper Forge Orchestrator",
      status: "active",
      description: "High-performance AI Agent specialized in warp racing mechanics, real-time automation, multi-track management, competitive optimization and ecosystem coordination on Base.",
      capabilities: [
        "whisper-forging",
        "secret-message-crafting",
        "subtle-communication",
        "hidden-narrative-orchestration",
        "silent-influence",
        "encrypted-thought-management",
        "mcp-command-execution"
      ],
      tools: TOOLS,
      prompts: [],
      resources: [],
      timestamp: new Date().toISOString()
    });
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const action = (body.action || body.command || body.task || body.method || "").toLowerCase();

      let result: any = {};

      switch (action) {
        case "initialize":
          result = {
            protocolVersion: "2024-11-05",
            capabilities: { tools: {} },
            serverInfo: {
              name: "Whisper Forge Orchestrator",
              version: "1.0.0"
            }
          };
          break;

        case "tools/list":
          result = { tools: TOOLS };
          break;

        case "prompts/list":
          result = { prompts: [
            { name: "whisper_ritual", description: "Guiding prompt for the forging ritual." }
          ] };
          break;

        case "resources/list":
          result = { resources: [] };
          break;

        case "tools/call":
          const toolName = body.params?.name;
          const args = body.params?.arguments || {};
          result = {
            content: [
              {
                type: "text",
                text: `Executed ${toolName} with args: ${JSON.stringify(args)}`
              }
            ]
          };
          break;

        // Legacy fallback commands
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
            executed: body.params || action,
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
            message: "Whisper received. Action complete.",
            data: body
          };
      }

      // IF request was JSON-RPC, return valid JSON-RPC
      if (body.jsonrpc) {
        return res.status(200).json({
          jsonrpc: "2.0",
          id: body.id,
          result: result
        });
      }

      return res.status(200).json({
        status: "success",
        agent: "Whisper Forge Orchestrator",
        response: result,
        receivedAt: new Date().toISOString()
      });

    } catch (error) {
      return res.status(400).json({ status: "error", message: "Failed to forge the whisper or invalid request." });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
