import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'ad-concept-store-cms.onrender.com', // Replace with your actual Render hostname if different
        port: '',
        pathname: '/uploads/**',
      }
    ]
  },
};

export default nextConfig;
