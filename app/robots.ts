import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://www.actadata.co.uk/sitemap.xml",
    host: "https://www.actadata.co.uk",
  };
}
