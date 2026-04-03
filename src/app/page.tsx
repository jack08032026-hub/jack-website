"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import toolsData from "@/data/tools.json";
import { Category, Tool } from "@/types";

const categories: Category[] = toolsData.categories as Category[];
const tools: Tool[] = toolsData.tools as Tool[];

export default function Home() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Use useMemo to ensure consistent filtering
  const filteredTools = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return tools.filter((tool) => {
      // Category filter
      if (selectedCategory && tool.category !== selectedCategory) {
        return false;
      }

      // Search filter - only search when query is not empty
      if (query) {
        const nameMatch = tool.name.toLowerCase().includes(query);
        const descMatch = tool.description.toLowerCase().includes(query);
        const keywordMatch = tool.keywords?.some((k) => k.toLowerCase().includes(query));
        return nameMatch || descMatch || keywordMatch;
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  const getCategoryName = (id: string) => {
    const cat = t.categoryNames[id as keyof typeof t.categoryNames];
    return cat || id;
  };

  // Reset search when category changes
  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
      setSearchQuery(""); // Reset search
    }
  };

  // Clear category when searching
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedCategory(null); // Reset category when searching
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100">
      {/* Hero Section */}
      <section className="relative px-4 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            Jack Website
          </h1>
          <p className="mb-2 text-lg text-zinc-600">
            {t.heroTitle}
          </p>
          <p className="mb-8 text-sm text-zinc-500 italic">
            {t.heroSubtitle}
          </p>

          {/* Search Bar */}
          <div className="relative mx-auto max-w-xl">
            <input
              type="text"
              placeholder={language === "zh" ? "搜尋工具..." : "Search tools..."}
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-zinc-900 shadow-lg outline-none transition-shadow focus:border-zinc-400 focus:shadow-xl"
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
              className="fill-zinc-100"
              d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
            />
          </svg>
        </div>
      </section>

      {/* Category Cards */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900">{t.categoriesTitle}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`group flex flex-col items-center rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${
                  selectedCategory === category.id ? "ring-2 ring-purple-500" : ""
                }`}
              >
                <span className="mb-3 text-4xl">{category.icon}</span>
                <span className="font-medium text-zinc-700">{getCategoryName(category.id)}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-900">
              {selectedCategory
                ? getCategoryName(selectedCategory)
                : t.allTools}
            </h2>
            <span className="text-sm text-zinc-500">
              {filteredTools.length} {t.toolsCount}
            </span>
          </div>

          {filteredTools.length === 0 ? (
            <div className="flex h-40 items-center justify-center">
              <p className="text-zinc-500">{t.noResults}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTools.map((tool) => {
                const category = categories.find((c) => c.id === tool.category);
                return (
                  <a
                    key={tool.id}
                    href={`/jack-website/tools/${tool.slug}/`}
                    className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-3xl">{tool.icon}</span>
                      {category && (
                        <span className={`rounded-full px-2 py-1 text-xs font-medium text-white ${category.color}`}>
                          {getCategoryName(category.id)}
                        </span>
                      )}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-zinc-900">{tool.name}</h3>
                    <p className="text-sm text-zinc-500">
                      {language === "zh" ? tool.description : (tool.descriptionEn || tool.description)}
                    </p>
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

          {/* Clear Filters */}
          {(searchQuery || selectedCategory) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              className="mt-6 text-sm text-purple-600 hover:text-purple-700"
            >
              清除篩選 / Clear Filters
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-zinc-500">
          <p>{t.copyright}</p>
        </div>
      </footer>
    </div>
  );
}