"use client";

import { motion } from "motion/react";
import SearchInput from "./SearchInput";

interface AnimatedHeroProps {
  title: string;
  subtitle: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export default function AnimatedHero({
  title,
  subtitle,
  searchValue,
  onSearchChange,
}: AnimatedHeroProps) {
  return (
    <section className="relative overflow-hidden px-4 py-24 text-center">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 bg-gradient-to-r from-zinc-900 via-purple-700 to-zinc-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent dark:from-zinc-50 dark:via-purple-400 dark:to-zinc-50 sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 text-lg text-zinc-600 dark:text-zinc-400"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SearchInput value={searchValue} onChange={onSearchChange} />
        </motion.div>
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
