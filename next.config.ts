/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    ppr: true,
    inlineCss: true,
    useCache: true,
    newDevOverlay: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**',
      },
    ],
  },
};
