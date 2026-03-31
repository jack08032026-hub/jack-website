import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
}

export default function CategoryCard({ category, isSelected, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group flex flex-col items-center rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-800 ${
        isSelected
          ? "ring-2 ring-zinc-900 dark:ring-zinc-50"
          : ""
      }`}
    >
      <span className="mb-3 text-4xl transition-transform group-hover:scale-110">
        {category.icon}
      </span>
      <span className="font-medium text-zinc-700 dark:text-zinc-300">
        {category.name}
      </span>
    </button>
  );
}
