export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  icon: string;
}

export interface ToolsData {
  categories: Category[];
  tools: Tool[];
}
