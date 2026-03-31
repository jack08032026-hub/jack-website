"use client";

import SearchBar from "./SearchBar";

interface HeroProps {
  title: string;
  subtitle: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export default function Hero({ title, subtitle, searchValue, onSearchChange }: HeroProps) {
  return (
    <section className="relative px-4 py-24 text-center">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">{subtitle}</p>
        <SearchBar value={searchValue} onChange={onSearchChange} />
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg className="absolute bottom-0 h-16 w-full" preserveAspectRatio="none" viewBox="0 0 1440 100">
          <path
            fill="currentColor"
            className="fill-zinc-100 dark:fill-zinc-900"
            d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
          />
        </svg>
      </div>
    </section>
  );
}
