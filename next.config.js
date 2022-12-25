/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.ytimg.com','lh3.googleusercontent.com','yt3.ggpht.com']
  }
}

module.exports = nextConfig
