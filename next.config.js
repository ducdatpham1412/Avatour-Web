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
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_URL_INTERNAL: process.env.NEXTAUTH_URL_INTERNAL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
};

module.exports = nextConfig;
