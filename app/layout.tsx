import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "Acta Data — Your entire data function. Built, handed over, done.",
  description:
    "Acta Data builds the data and AI capability your consumer business needs — integrations, warehouse, ETL, metric trees, board-grade reporting, LLM readiness — in months, not years.",
  metadataBase: new URL("https://actadata.io"),
  openGraph: {
    title: "Acta Data — Your entire data function. Built, handed over, done.",
    description:
      "Acta Data builds the data and AI capability your consumer business needs — in months, not years.",
    url: "https://actadata.io",
    siteName: "Acta Data",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} dark`} suppressHydrationWarning>
      <body className="min-h-dvh bg-background font-sans">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
