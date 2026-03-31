interface FooterProps {
  copyright?: string;
}

export default function Footer({ copyright = "© 2026 Jack Website. All rights reserved." }: FooterProps) {
  return (
    <footer className="border-t border-zinc-200 bg-white py-8 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-zinc-500">
        <p>{copyright}</p>
      </div>
    </footer>
  );
}
