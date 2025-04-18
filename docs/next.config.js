const withMarkdoc = require('@markdoc/next.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md'],
  experimental: {
    scrollRestoration: true,
  },
  output: 'standalone',
  basePath: '/dred',
  assetPrefix: '/dred/',
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.output.publicPath = '/dred' + config.output.publicPath
    return config
  },
}

module.exports = withMarkdoc()(nextConfig)
