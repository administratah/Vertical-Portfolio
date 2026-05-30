import { Router, type IRouter } from "express"
import { AgentClient } from "@21st-sdk/node"

const router: IRouter = Router()

router.post("/an-token", async (_req, res) => {
  const apiKey = process.env["API_KEY_21ST"]
  if (!apiKey) {
    res.status(500).json({ error: "API_KEY_21ST is not configured" })
    return
  }
  try {
    const client = new AgentClient({ apiKey })
    const token = await client.tokens.create({ agent: "my-agent" })
    res.json(token)
  } catch (err) {
    res.status(500).json({ error: "Failed to create agent token" })
  }
})

export default router
