import type { NextConfig } from "next";
import { PRACTICE_PAGES } from "./src/data/practice-pages";

const nextConfig: NextConfig = {
  // Legacy Site URLs all end in a slash; keep them byte-for-byte identical
  trailingSlash: true,
  async redirects() {
    return [
      // Topic pages moved when the Engineering Library split from the Blog
      { source: "/blog/topic/:topic/", destination: "/library/topic/:topic/", permanent: true },
      // the /automation/ index links to ../fake-pricing-page, which WordPress resolved to its real parent path
      { source: "/fake-pricing-page/", destination: "/automation/fake-pricing-page/", permanent: true },
    ];
  },
  async rewrites() {
    return {
      // Practice Pages are frozen static HTML (ADR 0002); serve them before any app route can match
      beforeFiles: PRACTICE_PAGES.map((p) => ({ source: p.path, destination: `/practice/pages/${p.key}.html` })),
    };
  },
};

export default nextConfig;
