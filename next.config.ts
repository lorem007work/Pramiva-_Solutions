import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — the site is served as plain files by Apache/LiteSpeed on cPanel.
  // There is no Node server in production. See docs/ARCHITECTURE.md §1.1.
  output: "export",

  // Emits about/index.html instead of about.html.
  // Without this, Apache will not serve /about. Not optional.
  trailingSlash: true,

  // No server to optimise images at runtime. Compress before committing,
  // and keep width/height on every <Image> to prevent layout shift.
  images: { unoptimized: true },
};

export default nextConfig;
