import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages configuration
  output: 'export',
  trailingSlash: true,
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization (unoptimized for static export)
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  
  // Note: Headers and redirects are not supported with static export
  // For GitHub Pages, security headers would need to be configured at the CDN level
};

export default nextConfig;
