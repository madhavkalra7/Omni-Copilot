"use client";

import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/75 px-3 py-1.5 text-xs text-muted-foreground dark:border-white/15 dark:bg-white/5 dark:text-white/75">
      <span>Omni is thinking</span>
      <div className="inline-flex items-center gap-1">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="h-1.5 w-1.5 rounded-full bg-cyan-300"
            animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: dot * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}
