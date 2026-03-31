"use client";

import { motion } from "motion/react";
import { Category } from "@/types";

interface AnimatedCategoryCardProps {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

export default function AnimatedCategoryCard({
  category,
  isSelected,
  onClick,
  index,
}: AnimatedCategoryCardProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative flex flex-col items-center rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all dark:border-zinc-800 dark:bg-zinc-800 ${
        isSelected ? "ring-2 ring-purple-500" : "hover:shadow-md"
      }`}
    >
      <motion.span
        className="mb-3 text-4xl"
        animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {category.icon}
      </motion.span>
      <span className="font-medium text-zinc-700 dark:text-zinc-300">{category.name}</span>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 transition-opacity group-hover:opacity-100"
        animate={isSelected ? { opacity: 1 } : {}}
      />
    </motion.button>
  );
}
