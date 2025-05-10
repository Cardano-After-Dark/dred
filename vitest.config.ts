/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import path from 'path';

console.log({__dirname});

export default defineConfig({
  test: {
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
    
    // DRED tests use REDIS, and multiple threads can stomp
    // on each other's state.  Run just one thread, with all tests 
    // executed serially.
    fileParallelism: false,
    sequence: {
        concurrent: false
    },
    poolOptions: {
      threads: {
        singleThread: true,
        maxThreads: 1,
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