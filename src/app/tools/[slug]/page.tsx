import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolPageClient } from "./ToolPageClient";
import toolsData from "@/data/tools.json";
import tutorialsData from "@/data/tutorials.json";
import { Category, Tool } from "@/types";

const tools: Tool[] = toolsData.tools as Tool[];
const categories: Category[] = toolsData.categories as Category[];

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

const tutorials = tutorialsData.tutorials as Record<string, Tutorial>;

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    return {
      title: "Tool Not Found | Jack Website",
    };
  }

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
      "og:url": `https://jack08032026-hub.github.io/jack-website/tools/${slug}/`,
    },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  const category = categories.find((c) => c.id === tool.category);
  const tutorial = tutorials[slug];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: tool.url,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <ToolPageClient
      tool={tool}
      category={category}
      tutorial={tutorial}
      jsonLd={jsonLd}
      allTools={tools}
      allCategories={categories}
    />
  );
}
