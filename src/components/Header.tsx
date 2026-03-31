"use client";

import Link from "next/link";
import LanguageToggle from "@/i18n/LanguageToggle";
import ThemeToggle from "@/i18n/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/jack-website/jack-icon.png"
            alt="Jack"
            className="h-8 w-8 rounded-lg object-cover"
          />
          <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            Jack Website
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
        </nav>
      </div>
    </header>
  );
}