import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 1,

  use: {
    baseURL: 'https://slackdesk.org',

    // Force system Chromium (no Playwright browser download needed)
    browserName: 'chromium',
    launchOptions: {
      executablePath: '/usr/bin/chromium',
      // If you ever hit sandbox errors, uncomment:
      // args: ['--no-sandbox'],
    },

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off', // avoids Playwright ffmpeg requirement
  },
});
