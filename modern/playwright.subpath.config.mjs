import { defineConfig, devices } from '@playwright/test';

// Independent integration fixture: actual compiled dist served at /opalubka/.
// No hosted URL or deployment is involved.
export default defineConfig({
  testDir: './tests/subpath',
  outputDir: './test-results/subpath', // keep the five original Chromium screenshots from the main Playwright run
  timeout: 45000,
  workers: 1,
  retries: 0,
  reporter: [['list'], ['html', { outputFolder: 'playwright-subpath-report', open: 'never' }]],
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://127.0.0.1:8766/opalubka/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
});
