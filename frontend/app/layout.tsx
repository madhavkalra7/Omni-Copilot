import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";

import { Providers } from "@/components/providers";
import "@/app/globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

export const metadata: Metadata = {
  title: "Omni Copilot",
  description: "Chat-first universal AI agent for your daily tools"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${spaceGrotesk.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
