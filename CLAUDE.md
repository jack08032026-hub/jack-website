# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Jack Website is a tool navigation site developed by Jack, curating online resources for developers, designers, and creators. It's a Next.js 16.2.1 (App Router) website with bilingual (Chinese/English) support and dark/light theme.

## Commands

```bash
# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

Open http://localhost:3000 to view the site.

## Architecture

- **src/app/** - Next.js App Router pages (layout.tsx, page.tsx)
- **src/app/tools/[slug]/** - Dynamic tool detail pages
- **src/components/** - React components (Header, Footer, Hero, SearchBar, ToolCard, CategoryCard, ThemeToggle)
- **src/data/** - tools.json (100+ tools), tutorials.json
- **src/i18n/** - Language context and translations
- **src/types/** - TypeScript type definitions

## Tech Stack

- Next.js 16.2.1 (App Router)
- React 19
- Tailwind CSS v4
- TypeScript
- Motion (for animations)
- ESLint 9

Key configurations: `next.config.ts`, `tsconfig.json`, `tailwindcss` v4 (CSS-based config in globals.css).

## Adding New Tools

Tools are stored in `src/data/tools.json`. Each tool entry has:
- `id`, `name`, `slug`, `description`, `url`, `category`, `icon`, `tags`, `featured`, `language`