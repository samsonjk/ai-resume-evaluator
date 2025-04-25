import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '1mb', // example value
      allowedOrigins: ['https://localhost:3000'],
    },
  },
};

export default nextConfig;
