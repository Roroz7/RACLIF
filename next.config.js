/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com'],
  },
}

module.exports = nextConfig
