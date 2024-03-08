const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["render.worldofwarcraft.com", "cataas.com"],
  },
};

module.exports = () => {
  return withBundleAnalyzer(nextConfig);
};
