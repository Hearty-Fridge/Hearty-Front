/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://34.64.101.33:8080/api/v1/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
