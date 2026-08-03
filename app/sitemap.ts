import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.actadata.co.uk/",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.actadata.co.uk/privacy",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
