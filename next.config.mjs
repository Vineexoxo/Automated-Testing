/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone', // Ensure standalone output for server-side features
};

module.exports = nextConfig;