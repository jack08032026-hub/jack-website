"use client";

import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({ value, onChange, placeholder = "搜尋工具..." }: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
    <motion.div
      className="relative mx-auto max-w-xl"
      animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20"
        animate={isFocused ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="relative w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-zinc-900 shadow-lg outline-none transition-all focus:border-purple-400 focus:shadow-xl dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-50"
        />
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2"
          animate={isFocused ? { rotate: 90 } : { rotate: 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            className="h-5 w-5 text-zinc-400"
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
        </motion.div>
      </div>
    </motion.div>
  );
}
