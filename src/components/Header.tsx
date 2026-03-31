"use client";

import Link from "next/link";
import ThemeToggle from "@/components/providers/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/50 bg-white/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white">
            <span className="text-lg font-bold">J</span>
          </div>
          <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            Jack Website
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
