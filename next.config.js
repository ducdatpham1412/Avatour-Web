/**@type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/',
        destination: '/search',
      },
      {
        source: '/about-us',
        destination: '/landing/index.html',
      },
    ];
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
