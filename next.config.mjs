/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
