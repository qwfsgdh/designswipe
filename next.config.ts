import type { NextConfig } from "next";

const nextConfig = {
  output: 'export',
  basePath: '/designswipe',
  images: { 
    unoptimized: true,
    remotePatterns: [{ protocol:"https", hostname:"images.unsplash.com" }] 
  }
};
export default nextConfig;

