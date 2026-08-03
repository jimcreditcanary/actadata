import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Archivo_Black } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Acta Data — Your entire data function. Built, handed over, done.",
  description:
    "Acta Data builds the data and AI capability your consumer business needs — integrations, warehouse, ETL, metric trees, board-grade reporting, LLM readiness — in months, not years.",
  metadataBase: new URL("https://www.actadata.co.uk"),
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Acta Data — Your entire data function. Built, handed over, done.",
    description:
      "Acta Data builds the data and AI capability your consumer business needs — in months, not years.",
    url: "/",
    siteName: "Acta Data",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acta Data — Your entire data function. Built, handed over, done.",
    description:
      "Acta Data builds the data and AI capability your consumer business needs — in months, not years.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${archivoBlack.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-background font-sans">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
