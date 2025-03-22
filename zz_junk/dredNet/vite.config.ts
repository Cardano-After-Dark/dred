import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    conditions: ["network-preprod"],
        preserveSymlinks: true,
        alias: {
          'react': 'preact/compat',
          'react-dom': 'preact/compat'
        }
    
},
  optimizeDeps: {
//     exclude: [
//       '@helios-lang/tx-utils',
//       '@helios-lang/ledger',
//       '@helios-lang/contract-utils',
//       "@helios-lang/codec-utils",
//       "@helios-lang/crypto",
//       "@helios-lang/compiler",
//       "@helios-lang/compiler-utils",
//       "@helios-lang/uplc",
//   ]
  },
  build: {
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@helios-lang/tx-utils',
        '@helios-lang/ledger',
        '@helios-lang/contract-utils',
        // crypto, codec-utils
        "@helios-lang/codec-utils",
        "@helios-lang/crypto",
        "@helios-lang/compiler",
        "@helios-lang/compiler-utils",
        "@helios-lang/uplc"
    ]
    }
  }
})
