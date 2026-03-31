"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import Link from "next/link";
import MetadataJsonLd from "./MetadataJsonLd";
import { Category, Tool } from "@/types";

interface TutorialStep {
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
}

interface Tutorial {
  title: string;
  titleEn: string;
  steps: TutorialStep[];
  tips: string[];
  tipsEn: string[];
}

interface Props {
  tool: Tool;
  category: Category | undefined;
  tutorial: Tutorial | undefined;
  jsonLd: Record<string, unknown>;
  allTools: Tool[];
  allCategories: Category[];
}

export function ToolPageClient({ tool, category, tutorial, jsonLd, allTools, allCategories }: Props) {
  const { t, language } = useLanguage();

  const getCategoryName = (id: string) => {
    const cat = t.categoryNames[id as keyof typeof t.categoryNames];
    return cat || id;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <MetadataJsonLd data={jsonLd} />

      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-50"
          >
            <span>←</span>
            <span>Jack Website</span>
          </Link>
        </div>
      </header>

      {/* Tool Content */}
      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-800">
          {/* Tool Header */}
          <div className="mb-8 flex items-start gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 text-4xl dark:from-purple-900/30 dark:to-blue-900/30">
              {tool.icon}
            </div>
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                  {tool.name}
                </h1>
                {category && (
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium text-white ${category.color}`}
                  >
                    {getCategoryName(category.id)}
                  </span>
                )}
              </div>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                {tool.shortDescription || tool.description}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {t.about} {tool.name}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">{tool.description}</p>
          </div>

          {/* Keywords */}
          {tool.keywords && tool.keywords.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {t.relatedKeywords}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tool.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-medium text-white transition-all hover:from-purple-700 hover:to-blue-700 hover:shadow-lg"
          >
            {t.visit} {tool.name}
            <svg
              className="h-4 w-4"
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
          </a>
        </div>

        {/* Tutorial Section */}
        {tutorial && (
          <div className="mt-12 rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-800">
            <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              📖 {language === "zh" ? tutorial.title : tutorial.titleEn}
            </h2>

            {/* Steps */}
            <div className="mb-8 space-y-4">
              {tutorial.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-4 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                      {language === "zh" ? step.title : step.titleEn}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">{language === "zh" ? step.content : step.contentEn}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tips */}
            {tutorial.tips && tutorial.tips.length > 0 && (
              <div className="rounded-xl bg-yellow-50 p-4 dark:bg-yellow-900/20">
                <h3 className="mb-3 font-semibold text-yellow-800 dark:text-yellow-200">
                  💡 {t.tips}
                </h3>
                <ul className="space-y-2">
                  {(language === "zh" ? tutorial.tips : tutorial.tipsEn).map((tip, index) => (
                    <li key={index} className="text-sm text-yellow-700 dark:text-yellow-300">
                      • {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Related Tools */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {t.relatedTools}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allTools
              .filter((t) => t.category === tool.category && t.id !== tool.id)
              .slice(0, 3)
              .map((relatedTool) => (
                <Link
                  key={relatedTool.id}
                  href={`/jack-website/tools/${relatedTool.slug}/`}
                  className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-800"
                >
                  <span className="mb-3 text-3xl">{relatedTool.icon}</span>
                  <h3 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-50">
                    {relatedTool.name}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{relatedTool.description}</p>
                </Link>
              ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <p>{t.copyright}</p>
        </div>
      </footer>
    </div>
  );
}