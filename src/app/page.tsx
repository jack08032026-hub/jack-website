"use client";

import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Category, Tool } from "@/types";
import toolsData from "@/data/tools.json";

const categories: Category[] = toolsData.categories as Category[];
const tools: Tool[] = toolsData.tools as Tool[];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      {/* Hero Section */}
      <section className="relative px-4 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
            Jack Website
          </h1>
          <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
            探索最棒的開發工具、AI 資源和生產力應用
          </p>

          {/* Search Bar */}
          <div className="relative mx-auto max-w-xl">
            <input
              type="text"
              placeholder="搜尋工具..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-zinc-900 shadow-lg outline-none transition-shadow focus:border-zinc-400 focus:shadow-xl dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-50"
            />
            <svg
              className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
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

      {/* Category Cards */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">工具分類</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                className={`group flex flex-col items-center rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-800 ${
                  selectedCategory === category.id ? "ring-2 ring-zinc-900 dark:ring-zinc-50" : ""
                }`}
              >
                <span className="mb-3 text-4xl">{category.icon}</span>
                <span className="font-medium text-zinc-700 dark:text-zinc-300">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {selectedCategory
                ? categories.find((c) => c.id === selectedCategory)?.name
                : "所有工具"}
            </h2>
            <span className="text-sm text-zinc-500">{filteredTools.length} 個工具</span>
          </div>

          {filteredTools.length === 0 ? (
            <div className="flex h-40 items-center justify-center">
              <p className="text-zinc-500">沒有找到相關工具</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTools.map((tool) => {
                const category = categories.find((c) => c.id === tool.category);
                return (
                  <a
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-800"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-3xl">{tool.icon}</span>
                      {category && (
                        <span className={`rounded-full px-2 py-1 text-xs font-medium text-white ${category.color}`}>
                          {category.name}
                        </span>
                      )}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">{tool.name}</h3>
                    <p className="text-sm text-zinc-500">{tool.description}</p>
                    <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
                      <svg className="h-5 w-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
