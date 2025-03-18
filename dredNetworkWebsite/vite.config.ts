import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  resolve: {
    conditions: ["network-preprod"],
    alias: {
      'react': '@preact/compat',
      'react-dom': '@preact/compat',
      'react-dom/test-utils': '@preact/compat/test-utils',
      'react/jsx-runtime': '@preact/compat/jsx-runtime',
      '@donecollectively/stellar-contracts': resolve(__dirname, '../../stellar-contracts/dist/stellar-contracts.mjs'),
      '@donecollectively/stellar-contracts/ui': resolve(__dirname, '../../stellar-contracts/dist/ui.mjs'),
      '@donecollectively/stellar-contracts/HeliosProgramWithCacheAPI': resolve(__dirname, '../../stellar-contracts/dist/HeliosProgramWithMockCacheAPI.mjs'),
      '@donecollectively/stellar-contracts/testing': resolve(__dirname, '../../stellar-contracts/dist/testing-browser.mjs'),
      '@donecollectively/stellar-contracts/rollup-plugins': resolve(__dirname, '../../stellar-contracts/dist/rollup-plugins.mjs'),
      '@donecollectively/stellar-contracts/contracts/*.hlb': resolve(__dirname, '../../stellar-contracts/dist/contracts/*.hlb.mjs')
    }
  },
  optimizeDeps: {
    include: ['@preact/compat']
  },
  build: {
    commonjsOptions: {
      include: [/stellar-contracts/]
    }
  }
})
