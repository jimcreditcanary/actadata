import type { MetadataRoute } from "next";
import { sectors } from "@/lib/sectors";
import { posts, caseStudies } from "@/lib/posts";

const BASE = "https://www.actadata.co.uk";

/**
 * Generated from the same data the pages are, so a new sector or post is in the
 * sitemap the moment it exists — no second list to forget to update.
 *
 * `lastModified` matters more than it looks: without it a crawler has to guess
 * whether a re-crawl is worth it, and posts carry a real publication date we can
 * give it. Everything else gets the build date, which is honest — a rebuild is
 * the only way this site changes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const built = new Date();

  const core = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
    { path: "/how-it-works", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/what-we-build", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/sectors", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  ].map(p => ({ ...p, lastModified: built }));

  const sectorPages = sectors.map(s => ({
    path: `/sectors/${s.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: built,
  }));

  const postPages = posts.map(p => ({
    path: `/blog/${p.slug}`,
    priority: p.kind === "case-study" ? 0.8 : 0.7,
    changeFrequency: "yearly" as const,
    lastModified: new Date(`${p.published}T00:00:00Z`),
  }));

  // Only advertise an index once there is something on it.
  const blogIndex = posts.length
    ? [
        {
          path: "/blog",
          priority: 0.8,
          changeFrequency: "weekly" as const,
          lastModified: new Date(`${posts.map(p => p.published).sort().reverse()[0]}T00:00:00Z`),
        },
      ]
    : [];
  const studyIndex = caseStudies().length
    ? [
        {
          path: "/case-studies",
          priority: 0.8,
          changeFrequency: "monthly" as const,
          lastModified: built,
        },
      ]
    : [];

  return [...core, ...blogIndex, ...studyIndex, ...sectorPages, ...postPages].map(p => ({
    // The homepage canonical Next emits is the bare origin with no trailing
    // slash; match it here so the sitemap and the canonical agree exactly.
    url: p.path === "/" ? BASE : `${BASE}${p.path}`,
    lastModified: p.lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
