/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/card.png',
        destination: '/api/card',
      },
    ]
  },
  images: {
    unoptimized: true
  },
  assetPrefix: './',
}

module.exports = nextConfig
