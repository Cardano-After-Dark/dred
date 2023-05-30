const withMarkdoc = require('@markdoc/next.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md'],
  experimental: {
    scrollRestoration: true,
  },
  basePath: '/dred',
  assetPrefix: '/dred/',
  distDir: 'docs',
  webpack: (config) => {
    config.output.publicPath = '/dred' + config.output.publicPath
    return config
  },
  images: {
    loader: 'imgix',
    path: '/',
    domains: [], // Add your domains here if necessary
    unoptimized: true, // Disable image optimization
  },
}


module.exports = withMarkdoc()(nextConfig)
