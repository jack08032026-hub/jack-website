"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Tool, Category } from "@/types";

interface AnimatedToolCardProps {
  tool: Tool;
  category?: Category;
  index: number;
}

export default function AnimatedToolCard({ tool, category, index }: AnimatedToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
    >
      <Link
        href={`/tools/${tool.slug}`}
        className="group relative block overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-800"
      >
        {/* Gradient border on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="relative">
          {/* Content */}
          <div className="mb-4 flex items-center justify-between">
            <motion.span
              className="text-3xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {tool.icon}
            </motion.span>
            {category && (
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium text-white ${category.color}`}
              >
                {category.name}
              </span>
            )}
          </div>
          <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {tool.name}
          </h3>
          <p className="text-sm text-zinc-500">{tool.description}</p>

          {/* External link icon */}
          <motion.div
            className="absolute right-4 top-4"
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg
              className="h-5 w-5 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
