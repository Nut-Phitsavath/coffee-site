import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ponytail: no cacheComponents; this is a fully static site and dynamicParams needs it off
  experimental: { globalNotFound: true },
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [{ source: "/", destination: "/lo", permanent: false }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
