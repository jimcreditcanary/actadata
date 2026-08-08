import type { MetadataRoute } from "next";

/**
 * Everything allowed, and the AI crawlers named explicitly.
 *
 * A bare `*: allow` already permits them, but naming each one is the difference
 * between "not blocked" and "invited": several of these agents are checked for
 * separately from the wildcard, and Google-Extended in particular governs whether
 * the site can be used in AI Overviews and Gemini grounding. We want to be the
 * source that answers when somebody asks an assistant about operational data
 * layers, so every one of them is opted in on purpose.
 */
const AI_AGENTS = [
  "GPTBot", // OpenAI training + ChatGPT browsing
  "OAI-SearchBot", // ChatGPT search index
  "ChatGPT-User", // ChatGPT following a link on a user's behalf
  "ClaudeBot", // Anthropic crawler
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini + AI Overviews grounding
  "Applebot",
  "Applebot-Extended",
  "CCBot", // Common Crawl, which seeds many other models
  "Bingbot",
  "meta-externalagent",
  "Amazonbot",
  "DuckAssistBot",
  "cohere-ai",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_AGENTS.map(userAgent => ({ userAgent, allow: "/" })),
    ],
    sitemap: "https://www.actadata.co.uk/sitemap.xml",
    host: "https://www.actadata.co.uk",
  };
}
