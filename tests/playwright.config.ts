import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 1,

  use: {
    // Your hosted testbed
    baseURL: 'https://slackdesk.org',

    // Slackware-friendly artifacts
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off', // avoids Playwright ffmpeg download requirement
  },

  projects: [
    {
      name: 'chromium-system',
      use: {
        browserName: 'chromium',
        launchOptions: {
          executablePath: '/usr/bin/chromium',
          // If you ever hit sandbox issues, uncomment:
          // args: ['--no-sandbox'],
        },
      },
    },
  ],
});
