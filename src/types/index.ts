export interface SEOData {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  slug?: string;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: string;
  url: string;
  icon: string;
  keywords?: string[];
  seo?: SEOData;
  backLink?: string;
}

export interface ToolsData {
  categories: Category[];
  tools: Tool[];
}
