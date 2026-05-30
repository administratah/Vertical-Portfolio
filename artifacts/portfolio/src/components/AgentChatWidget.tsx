"use client"

import { useState } from "react"
import { AgentChat, createAgentChat } from "@21st-sdk/react"
import { useChat } from "@ai-sdk/react"
import theme from "@/theme.json"

const chat = createAgentChat({
  agent: "my-agent",
  tokenUrl: "/api/an-token",
})

function ChatPanel({ onClose }: { onClose: () => void }) {
  const { messages, input, handleInputChange, handleSubmit, status, stop, error } =
    useChat({ chat } as Parameters<typeof useChat>[0])

  return (
    <div className="fixed bottom-20 right-6 z-50 w-[380px] h-[540px] rounded-2xl shadow-2xl overflow-hidden border border-border bg-background flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <span className="font-semibold text-sm">Portfolio Assistant</span>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors text-lg leading-none"
          aria-label="Close chat"
        >
          ×
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        <AgentChat
          messages={messages}
          onSend={() => handleSubmit()}
          status={status}
          onStop={stop}
          error={error ?? undefined}
          theme={theme}
        />
      </div>
    </div>
  )
}

export default function AgentChatWidget() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && <ChatPanel onClose={() => setOpen(false)} />}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-foreground text-background shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
        aria-label="Open portfolio assistant"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </>
  )
}
