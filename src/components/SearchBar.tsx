"use client";

import { useState, useEffect, useRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "搜尋工具..." }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Cmd/Ctrl + K to focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative mx-auto max-w-xl">
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-zinc-900 shadow-lg outline-none transition-all focus:border-zinc-400 focus:shadow-xl dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-50"
      />
      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2">
        <kbd className="hidden rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-500 dark:bg-zinc-700 sm:block">
          ⌘K
        </kbd>
        <svg
          className={`h-5 w-5 text-zinc-400 transition-transform ${isFocused ? "scale-125" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}
