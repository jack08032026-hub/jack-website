import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import toolsData from "@/data/tools.json";
import { Tool, Category } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

const tools: Tool[] = toolsData.tools as Tool[];
const categories: Category[] = toolsData.categories as Category[];

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    return {
      title: "工具不存在 | Jack Website",
    };
  }

  const category = categories.find((c) => c.id === tool.category);

  return {
    title: tool.seo?.title || `${tool.name} - ${tool.description} | Jack Website`,
    description: tool.seo?.description || tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: tool.seo?.ogTitle || tool.name,
      description: tool.seo?.ogDescription || tool.description,
      type: "website",
    },
    other: {
      "og:url": `https://jack-website.vercel.app/tools/${slug}`,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  const category = categories.find((c) => c.id === tool.category);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
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
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-100 text-4xl dark:bg-zinc-700">
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
                    {category.name}
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
              關於 {tool.name}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">{tool.description}</p>
          </div>

          {/* Keywords */}
          {tool.keywords && tool.keywords.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                相關關鍵字
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
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900"
          >
            造訪 {tool.name}
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

        {/* Related Tools */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            同類別工具
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools
              .filter((t) => t.category === tool.category && t.id !== tool.id)
              .slice(0, 3)
              .map((relatedTool) => (
                <Link
                  key={relatedTool.id}
                  href={`/tools/${relatedTool.slug}`}
                  className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-800"
                >
                  <span className="mb-3 text-3xl">{relatedTool.icon}</span>
                  <h3 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-50">
                    {relatedTool.name}
                  </h3>
                  <p className="text-sm text-zinc-500">{relatedTool.description}</p>
                </Link>
              ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-zinc-500">
          <p>© 2026 Jack Website. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
