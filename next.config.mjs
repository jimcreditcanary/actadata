/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        // /data-protection was briefly its own route before the content was folded
        // into /what-we-build as a section. It shipped, so it was crawlable and in
        // the sitemap — a 301 costs nothing and keeps any link or index entry alive.
        source: "/data-protection",
        destination: "/what-we-build#data-protection",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Strengthen HSTS across every response. `includeSubDomains` + `preload`
        // is what qualifies the domain for the browser preload list; once it is
        // submitted at https://hstspreload.org, browsers go straight to HTTPS and
        // the http→https hop in the redirect chain disappears, leaving the single
        // apex→www redirect Vercel manages.
        //
        // Caveat this deliberately commits to: every current and future subdomain
        // of actadata.co.uk must be served over valid HTTPS, and preload is slow
        // to reverse. That is fine for a site that is HTTPS-only today.
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};
export default nextConfig;
