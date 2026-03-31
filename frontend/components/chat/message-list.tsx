"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { ChatMessage } from "@/lib/api/client";

interface MessageListProps {
  messages: ChatMessage[];
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      onClick={onCopy}
      className="absolute right-2 top-2 rounded-md border border-white/20 bg-black/40 p-1 text-white/70 hover:text-white"
      aria-label="Copy code"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => {
        const isUser = message.role === "user";

        return (
          <div
            key={message.id}
            className={`rounded-2xl border p-4 shadow-lg backdrop-blur-xl ${
              isUser
                ? "ml-8 border-cyan-300/30 bg-cyan-300/10"
                : "mr-8 border-white/15 bg-black/35"
            }`}
          >
            <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-white/60">
              {isUser ? "You" : "Omni"}
            </div>

            <article className="prose prose-sm prose-invert max-w-none text-white/90">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code(props) {
                    const { children, className } = props;
                    const isInline = !className;
                    const value = String(children ?? "");

                    if (isInline) {
                      return <code className="rounded bg-black/40 px-1.5 py-0.5 text-cyan-200">{children}</code>;
                    }

                    return (
                      <div className="relative">
                        <CopyButton text={value} />
                        <pre className="overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-3">
                          <code className={className}>{children}</code>
                        </pre>
                      </div>
                    );
                  }
                }}
              >
                {message.content}
              </ReactMarkdown>
            </article>
          </div>
        );
      })}
    </div>
  );
}
