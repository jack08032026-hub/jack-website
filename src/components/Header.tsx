"use client";

import Link from "next/link";
import LanguageToggle from "@/i18n/LanguageToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/jack-website/" className="flex items-center gap-2">
          <img
            src="/jack-website/jack-icon.png"
            alt="Jack"
            className="h-8 w-8 rounded-lg object-cover"
          />
          <span className="text-lg font-bold text-zinc-900">
            Jack Website
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <LanguageToggle />
        </nav>
      </div>
    </header>
  );
}
