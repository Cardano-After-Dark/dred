import withMarkdoc from "@markdoc/next.js"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "tsx"],
  experimental: {
    scrollRestoration: true,
  },
  basePath: "/dred",
  assetPrefix: "/dred/",
  // Add output configuration for static export
  output: 'export',
  // Disable server-side features
  images: {
    unoptimized: true,
  },
  // Ensure client-side rendering
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    config.output.publicPath = "/dred" + config.output.publicPath
    // Add TypeScript support
    config.resolve.extensionAlias = {
      ".js": [".js", ".ts", ".tsx"],
    }

    // Configure webpack to respect package exports field
    config.resolve.conditionNames = [
      "import",
      ...(isServer ? ["node"] : []),
      "default",
      "network-preprod",
    ]

    return config
  },
}

export default withMarkdoc()(nextConfig)
