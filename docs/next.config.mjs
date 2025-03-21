import withMarkdoc from "@markdoc/next.js"
import path from "path"
import { fileURLToPath } from "url"

// Get the directory path equivalent to __dirname in CommonJS
const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
  output: "export",
  // Disable server-side features
  images: {
    unoptimized: true,
  },
  // Ensure client-side rendering
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    config.output.publicPath = "/dred" + config.output.publicPath

    config.resolve.modules = [
        path.resolve(__dirname, "node_modules"),
        path.resolve(__dirname, "../../stellar-contracts/node_modules")
    ]

    // config.resolve.alias["@donecollectively/stellar-contracts"] =
    //     path.resolve(
    //       __dirname,
    //       "node_modules/@donecollectively/stellar-contracts"
    //     )
    //   config.resolve.alias["@donecollectively/stellar-contracts/ui"] =
    //     path.resolve(
    //       __dirname,
    //       "node_modules/@donecollectively/stellar-contracts/ui.mjs"
    //     )
    //   config.resolve.alias["react"] = path.resolve(
    //     __dirname,
    //     "node_modules/react"
    //   )
    //   config.resolve.alias["react-dom"] = path.resolve(
    //     __dirname,
    //     "node_modules/react-dom"
    //   )
    //   config.resolve.alias["@helios-lang/compiler-utils"] = path.resolve(
    //     __dirname,
    //     "node_modules/@helios-lang/compiler-utils"
    //   )
      config.resolve.alias["@helios-lang/tx-utils"] = path.resolve(
        __dirname,
        "node_modules/@helios-lang/tx-utils"
      )
    //   config.resolve.alias["@helios-lang/ledger"] = path.resolve(
    //     __dirname,
    //     "node_modules/@helios-lang/ledger"
    //   )

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
