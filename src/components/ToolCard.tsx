import Link from "next/link";
import { Tool, Category } from "@/types";

interface ToolCardProps {
  tool: Tool;
  category?: Category;
}

export default function ToolCard({ tool, category }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-800"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-3xl">{tool.icon}</span>
        {category && (
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium text-white ${category.color}`}
          >
            {category.name}
          </span>
        )}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {tool.name}
      </h3>
      <p className="text-sm text-zinc-500">{tool.description}</p>
      <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
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
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </div>
    </Link>
  );
}
