/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import path from 'path';

console.log({__dirname});

export default defineConfig({
  test: {
    environment: 'node',
    // env: {
    //   BF_API_KEY: 'preprodB0ntx....',
    //   CARDANO_NETWORK: 'preprod'
    // },
    include: ['src/**/*.test.ts'],
    //! Exclude the `skillz` symlink: it points to /home/san/dev/odin/skillz,
    //  which contains its own `skillz -> ./` self-link. Walking through
    //  it (file discovery, dependency scan, watcher) ELOOPs after ~40
    //  recursive hops. See server.watch.ignored below for the watcher.
    exclude: ['**/node_modules/**', 'dist/**', 'src/redis/streams/**', 'skillz/**', '**/skillz/**'],
    mockReset: true,
    restoreMocks: true,
    // change timeouts based on test needs
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
  //! Stop Vite's file watcher from following the `skillz` symlink
  //  (see test.exclude above for the rationale).
  server: {
    watch: {
      ignored: ['**/skillz/**'],
    },
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