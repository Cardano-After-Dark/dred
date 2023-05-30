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
  webpack: (config) => {
    config.output.publicPath = '/dred' + config.output.publicPath
    return config
  },
  // The below configuration is needed only to generate a static website
  // To regenerate GH-Pages, uncomment the section below, and execute
  // # pnpm next build
  // # pnpm next export -o docs
  // images: {
  //   loader: 'imgix',
  //   path: '/',
  //   domains: [], // Add your domains here if necessary
  //   unoptimized: true, // Disable image optimization
  // },
}
module.exports = withMarkdoc()(nextConfig)
