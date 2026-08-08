import type { MetadataRoute } from "next";
import { sectors } from "@/lib/sectors";
import { posts, caseStudies } from "@/lib/posts";

const BASE = "https://www.actadata.co.uk";

/**
 * Generated from the same data the pages are, so a new sector or post is in the
 * sitemap the moment it exists — no second list to forget to update.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const core = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
    { path: "/how-it-works", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/what-we-build", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/sectors", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const sectorPages = sectors.map(s => ({
    path: `/sectors/${s.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const postPages = posts.map(p => ({
    path: `/blog/${p.slug}`,
    priority: p.kind === "case-study" ? 0.8 : 0.6,
    changeFrequency: "yearly" as const,
  }));

  // Only advertise an index once there is something on it.
  const blogIndex = posts.length
    ? [{ path: "/blog", priority: 0.8, changeFrequency: "weekly" as const }]
    : [];
  const studyIndex = caseStudies().length
    ? [{ path: "/case-studies", priority: 0.8, changeFrequency: "monthly" as const }]
    : [];

  return [...core, ...blogIndex, ...studyIndex, ...sectorPages, ...postPages].map(p => ({
    url: `${BASE}${p.path}`,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
