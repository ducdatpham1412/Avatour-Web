/**@type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/',
        destination: '/buddy',
      },
      {
        source: '/about-us',
        destination: '/landing/index.html',
      },
      {
        source: '/terms',
        destination: '/landing/terms.html',
      },
      {
        source: '/policy',
        destination: '/landing/policy.html',
      },
    ];
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
