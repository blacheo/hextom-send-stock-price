// playwright.config.js
import { defineConfig } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './e2e/tests',
  timeout: 30000,
  use: {
    headless: true,
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  globalSetup: path.resolve('./e2e/setup.js'), // ES module compatible path
});
