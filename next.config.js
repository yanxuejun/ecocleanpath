/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.ecocleanpath.com',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: 'ecocleanpath.com',
        pathname: '/wp-content/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/woo/:path*',
        destination: 'https://www.ecocleanpath.com/wp-json/wc/v3/:path*',
      },
      {
        source: '/api/wp/:path*',
        destination: 'https://www.ecocleanpath.com/wp-json/wp/v2/:path*',
      },
    ];
  },
};

module.exports = nextConfig;