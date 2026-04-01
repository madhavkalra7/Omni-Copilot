"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

import { HomeHero } from "@/components/landing/home-hero";

interface ThemePageProps {
  targetTheme: "dark" | "light";
}

export function ThemePage({ targetTheme }: ThemePageProps) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(targetTheme);
  }, [setTheme, targetTheme]);

  return <HomeHero />;
}
