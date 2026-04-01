"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

import { BackgroundPaths } from "@/components/ui/background-paths";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/chat/new" });
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 opacity-60">
        <BackgroundPaths title="Omni Copilot" showContent={false} />
      </div>

      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-20">
        <GlowCard
          glowColor="blue"
          customSize
          width="min(420px, 100%)"
          className="rounded-3xl border border-border/70 bg-background/75 p-8 backdrop-blur-2xl dark:border-white/15 dark:bg-black/50"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-200/80">Universal Agent</p>
              <h1 className="text-4xl font-semibold text-foreground dark:text-white">Omni Copilot</h1>
              <p className="text-sm text-muted-foreground dark:text-white/70">
                Connect your docs, calendar, mail, and code tools into one intelligent command center.
              </p>
            </div>

            <Button
              onClick={handleSignIn}
              disabled={isLoading}
              className="h-12 w-full rounded-xl bg-cyan-400 text-slate-950 hover:bg-cyan-300"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connecting...
                </span>
              ) : (
                "Continue with Google"
              )}
            </Button>

            <p className="text-xs text-muted-foreground dark:text-white/50">
              By continuing, you allow Omni Copilot to securely request access to your connected tools.
            </p>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}
