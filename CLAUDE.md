# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Repository: https://github.com/jack08032026-hub/jack-website.git

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
- Tailwind CSS v4 (CSS-based config in `src/app/globals.css`, no tailwind.config.js)
- TypeScript
- Motion (for animations)
- ESLint 9 (flat config at `eslint.config.mjs`)

Key configurations: `next.config.ts`, `tsconfig.json`.

## Data Structure

**`src/data/tools.json`** contains two sections:
- `categories`: 8 categories with `id`, `name`, `icon`, `color`, `slug`
- `tools`: entries with `id`, `name`, `slug`, `description`, `shortDescription`, `category`, `url`, `icon`, `keywords`, `seo`

Tool `slug` maps to dynamic route `src/app/tools/[slug]/page.tsx`.

## i18n

Translations in `src/i18n/translations.ts` with `zh` and `en` exports. Use `LanguageProvider` context to access translations in components.

## Theme

ThemeProvider in `src/i18n/ThemeProvider.tsx` for dark/light mode.

## Adding New Tools

Tools are stored in `src/data/tools.json`. Each tool entry has:
- `id`, `name`, `slug`, `description`, `url`, `category`, `icon`, `tags`, `featured`, `language`

**Note: No test framework configured.**