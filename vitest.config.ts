/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import path from 'path';

console.log({__dirname});

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
    exclude: ['**/node_modules/**', 'dist/**', 'src/redis/streams/**'],
    mockReset: true,
    restoreMocks: true,
    testTimeout: 100000, // Equivalent to JEST_TIMEOUT
    hookTimeout: 50000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    poolOptions: {
      threads: {
        singleThread: false, // Will be enabled via command line when needed
      },
    },
    alias: {
    //   '@platform': path.resolve(__dirname, 'platform/server/'),
      '@platform/*': path.resolve(__dirname, 'platform/server/*'),
      '#crypto': path.resolve(__dirname, 'node_modules/watsign/src/crypto.node.js'),
    },
  },
  resolve: {
    alias: {
      '@platform': path.resolve(__dirname, 'platform/server/'),
    },
    extensions: ['.mjs', '.js', '.ts', '.json', '.node']
  },
  // For compatibility with Node.js module resolution
  optimizeDeps: {
    include: [
      '@platform/server/*.ts',
      'src/**'
    ],
    exclude: [
      'src/redis/streams'
    ]
  }
}); 