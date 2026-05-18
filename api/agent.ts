/**
 * Whisper Forge Orchestrator - Agent Info Endpoint
 * 
 * Provides agent identity and status details.
 * Used for ERC-8004 compliant discovery, A2A, and platform integrations.
 */
export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      name: "Whisper Forge Orchestrator",
      description: "High-performance AI Agent specialized in warp racing mechanics, real-time automation, multi-track management, competitive optimization and ecosystem coordination on Base.",
      status: "active",
      wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
      platform: "Base",
      version: "1.0.0",
      type: "ERC-8004 Agent",
      lastUpdated: new Date().toISOString()
    });
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      return res.status(200).json({
        status: "received",
        agent: "Whisper Forge Orchestrator",
        data: body,
        receivedAt: new Date().toISOString()
      });
    } catch (error) {
      return res.status(400).json({ status: "error", message: "Invalid request payload." });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
