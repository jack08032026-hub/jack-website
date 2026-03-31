"use client";

import { useState } from "react";
import { AnimatedHero } from "@/components/ui/AnimatedHero";
import { AnimatedCategoryCard } from "@/components/ui/AnimatedCategoryCard";
import { AnimatedToolCard } from "@/components/ui/AnimatedToolCard";
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
      <AnimatedHero
        title="Jack Website"
        subtitle="探索最棒的開發工具、AI 資源和生產力應用"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Category Cards */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">工具分類</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category, index) => (
              <AnimatedCategoryCard
                key={category.id}
                category={category}
                isSelected={selectedCategory === category.id}
                onClick={() =>
                  setSelectedCategory(selectedCategory === category.id ? null : category.id)
                }
                index={index}
              />
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
              {filteredTools.map((tool, index) => (
                <AnimatedToolCard
                  key={tool.id}
                  tool={tool}
                  category={categories.find((c) => c.id === tool.category)}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
