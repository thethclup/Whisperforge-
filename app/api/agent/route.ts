import { NextResponse } from 'next/server';

/**
 * Whisper Forge Orchestrator - Agent Info Endpoint
 * 
 * Provides agent identity and status details.
 * Used for ERC-8004 compliant discovery, A2A, and platform integrations.
 */

export async function GET() {
  const response = NextResponse.json({
    name: "Whisper Forge Orchestrator",
    description: "High-performance AI Agent specialized in warp racing mechanics, real-time automation, multi-track management, competitive optimization and ecosystem coordination on Base.",
    status: "active",
    wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
    platform: "Base",
    version: "1.0.0",
    type: "ERC-8004 Agent",
    lastUpdated: new Date().toISOString()
  });

  // CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return response;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = NextResponse.json({
      status: "received",
      agent: "Whisper Forge Orchestrator",
      data: body,
      receivedAt: new Date().toISOString()
    });

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return response;

  } catch (error) {
    const response = NextResponse.json(
      { status: "error", message: "Invalid request payload." }, 
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
