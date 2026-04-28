/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/admin',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}

module.exports = nextConfig
