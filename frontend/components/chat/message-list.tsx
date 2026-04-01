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
      className="absolute right-2 top-2 rounded-md border border-border/70 bg-background/80 p-1 text-foreground/70 hover:text-foreground dark:border-white/20 dark:bg-black/40 dark:text-white/70 dark:hover:text-white"
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
                ? "ml-2 border-cyan-500/35 bg-cyan-500/10 sm:ml-8"
                : "mr-2 border-border/70 bg-background/75 sm:mr-8 dark:border-white/15 dark:bg-black/35"
            }`}
          >
            <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground dark:text-white/60">
              {isUser ? "You" : "Omni"}
            </div>

            <article className="prose prose-sm max-w-none text-foreground dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code(props) {
                    const { children, className } = props;
                    const isInline = !className;
                    const value = String(children ?? "");

                    if (isInline) {
                      return <code className="rounded bg-muted px-1.5 py-0.5 text-cyan-700 dark:bg-black/40 dark:text-cyan-200">{children}</code>;
                    }

                    return (
                      <div className="relative">
                        <CopyButton text={value} />
                        <pre className="overflow-x-auto rounded-xl border border-border/70 bg-background/80 p-3 dark:border-white/10 dark:bg-black/50">
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
