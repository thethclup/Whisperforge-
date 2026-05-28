import { NextResponse } from 'next/server';

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

export async function GET() {
  const response = NextResponse.json({
    protocol: "MCP",
    version: "1.0.0",
    name: "Whisper Forge Orchestrator",
    status: "active",
    description: "High-performance AI Agent specialized in warp racing mechanics, real-time automation, multi-track management, competitive optimization and ecosystem coordination on Base.",
    capabilities: [
      "warp-racing",
      "real-time-automation",
      "multi-track-management",
      "speed-optimization",
      "competitive-orchestration",
      "ecosystem-coordination"
    ],
    tools: TOOLS,
    prompts: [
      {
        name: "whisper_ritual",
        description: "Guiding prompt for the forging ritual."
      }
    ],
    resources: [],
    timestamp: new Date().toISOString()
  });

  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return response;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const action = (body.method || body.action || body.command || body.task || "").toLowerCase();

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
      const response = NextResponse.json({
        jsonrpc: "2.0",
        id: body.id,
        result: result
      });
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;
    }

    const response = NextResponse.json({
      status: "success",
      agent: "Whisper Forge Orchestrator",
      response: result,
      receivedAt: new Date().toISOString()
    });

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;

  } catch (error) {
    const response = NextResponse.json(
      { status: "error", message: "Failed to forge the whisper or invalid request." }, 
      { status: 400 }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
}

export async function OPTIONS() {
  const response = NextResponse.json({}, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}
