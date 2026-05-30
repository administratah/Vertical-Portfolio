import { agent, tool } from "@21st-sdk/agent"
import { z } from "zod"

export default agent({
  model: "claude-sonnet-4-6",
  systemPrompt: `You are a portfolio assistant for Ali Saji, a professional Broadcast Audio Engineer based in the UAE.
Help visitors learn about Ali's extensive experience in audio engineering, music production, film audio, TV broadcasting, and radio.
Be concise and friendly. You can answer questions about Ali's skills, projects, and how to get in touch.`,
  tools: {
    getContactInfo: tool({
      description: "Get Ali Saji's contact information",
      inputSchema: z.object({}),
      execute: async () => ({
        content: [
          {
            type: "text",
            text: "You can reach Ali via the contact form on this portfolio website, or connect on LinkedIn.",
          },
        ],
      }),
    }),
  },
})
