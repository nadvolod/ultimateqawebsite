import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Legacy Site URLs all end in a slash; keep them byte-for-byte identical
  trailingSlash: true,
  async redirects() {
    // Topic pages moved when the Engineering Library split from the Blog
    return [{ source: "/blog/topic/:topic/", destination: "/library/topic/:topic/", permanent: true }];
  },
};

export default nextConfig;
