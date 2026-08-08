import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Archivo_Black } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { JsonLd } from "@/components/json-ld";
import { graph, organisation, website, service } from "@/lib/seo";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

export const metadata: Metadata = {
  /* Interior pages set their own title; this template keeps the brand on the end
     of every one of them without each page repeating it. */
  title: {
    default: "Acta Data — The data layer AI needs. Built, handed over, done.",
    template: "%s | Acta Data",
  },
  description:
    "Acta Data builds the data layer AI needs: timely data recorded once and never rewritten, in BigQuery, inside your own secure, scalable Google environment, with Claude wired in for real self-service. Live in weeks, not years.",
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
    title: "Acta Data — The data layer AI needs. Built, handed over, done.",
    description:
      "Timely data, recorded once and never rewritten, in a single source AI can work with. All on Google, in your own secure, scalable environment.",
    url: "/",
    siteName: "Acta Data",
    locale: "en_GB",
    type: "website",
  },
  /* Explicitly ask for full snippets and large image previews. Without these,
     Google is free to truncate, and truncation is what stops a page being the
     answer rather than a link. */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  authors: [{ name: "Acta Data Ltd", url: "https://www.actadata.co.uk" }],
  creator: "Acta Data Ltd",
  publisher: "Acta Data Ltd",
  category: "Data and AI consultancy",
  twitter: {
    card: "summary_large_image",
    title: "Acta Data — The data layer AI needs. Built, handed over, done.",
    description:
      "Timely data, recorded once and never rewritten, in a single source AI can work with. All on Google, in your own secure, scalable environment.",
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
        {/* Who we are, what the site is, and what we sell — on every page, so no
            crawler has to find the right one to learn it. */}
        <JsonLd data={graph(organisation, website, service)} />
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
