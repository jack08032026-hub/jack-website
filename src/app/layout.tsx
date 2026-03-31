import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Jack Website - 開發者工具資源整合",
    template: "%s | Jack Website",
  },
  description: "探索最棒的開發工具、AI 資源和生產力應用。Jack Website 為您整合最實用的線上工具和資源。",
  keywords: ["開發工具", "AI", "生产力", "設計工具", "線上工具", "資源整合"],
  openGraph: {
    title: "Jack Website - 開發者工具資源整合",
    description: "探索最棒的開發工具、AI 資源和生產力應用",
    type: "website",
    locale: "zh_TW",
    url: "https://jack08032026-hub.github.io/jack-website",
  },
  alternates: {
    canonical: "https://jack08032026-hub.github.io/jack-website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
