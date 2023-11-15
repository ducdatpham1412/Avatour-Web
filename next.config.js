/**@type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  rewrites: async () => {
    return [
      {
        source: '/',
        destination: '/landing/index.html',
      },
    ];
  },
};

module.exports = nextConfig;
