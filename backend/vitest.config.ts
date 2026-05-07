import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    setupFiles: ['./tests/setup-env.ts'],
    hookTimeout: 300000, // 5 minutes for MongoDB startup/download
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
  },
});
