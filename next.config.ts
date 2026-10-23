import type { NextConfig } from "next";

// Set only by the GitHub Pages workflow. Lao ISPs block *.vercel.app and *.netlify.app, so the
// client preview is a static export on *.github.io. The root redirect lives in the workflow.
const pagesBasePath = process.env.PAGES_BASE_PATH;

const nextConfig: NextConfig = {
  // ponytail: no cacheComponents; this is a fully static site and dynamicParams needs it off
  experimental: { globalNotFound: true },
  ...(pagesBasePath === undefined
    ? {
        images: { formats: ["image/avif", "image/webp"] },
        async redirects() {
          return [{ source: "/", destination: "/lo", permanent: false }];
        },
      }
    : {
        output: "export",
        basePath: pagesBasePath,
        trailingSlash: true,
        env: { NEXT_PUBLIC_BASE_PATH: pagesBasePath },
        images: { loader: "custom", loaderFile: "./lib/pages-image-loader.ts" },
      }),
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
