const nextConfig = {
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
        hostname: 'ad-concept-store-cms.onrender.com',
        port: '',
        pathname: '/uploads/**',
      }
    ]
  },
};

export default nextConfig;
