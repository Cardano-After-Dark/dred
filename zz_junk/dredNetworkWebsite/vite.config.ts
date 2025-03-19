import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic'
    })
  ],
  resolve: {
    conditions: ["network-preprod"],
    preserveSymlinks: true,
    alias: {
      'scheduler': 'scheduler/cjs/scheduler.development.js'
    }
  },
  optimizeDeps: {
    include: [
      '../../stellar-contracts/dist/stellar-contracts.mjs',
      '../../stellar-contracts/dist/ui.mjs',
      '../../stellar-contracts/dist/HeliosProgramWithMockCacheAPI.mjs',
      '../../stellar-contracts/dist/testing-node.mjs',
      '../../stellar-contracts/dist/rollup-plugins.mjs',
    ],
    exclude: [
      'es-module-lexer',
      'get-tsconfig',
      'estree-walker',
      'picomatch',
      'rollup-plugin-esbuild',
      'rollup-pluginutils',
      'reusify',
      '@rollup/pluginutils',
      '@cardano-ogmios/schema',
      'bech32',
      'isomorphic-ws',
      'cross-fetch',
      '@cardanosolutions/json-bigint',
      'fastq',
      'ts-custom-error',
      '@jridgewell/sourcemap-codec'
    ]
  },
  build: {
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'es-module-lexer',
        'get-tsconfig',
        'estree-walker',
        'picomatch',
        'rollup-plugin-esbuild',
        'rollup-pluginutils',
        'reusify',
        '@rollup/pluginutils',
        '@cardano-ogmios/schema',
        'bech32',
        'isomorphic-ws',
        'cross-fetch',
        '@cardanosolutions/json-bigint',
        'fastq',
        'ts-custom-error',
        '@jridgewell/sourcemap-codec'
      ]
    }
  }
})
