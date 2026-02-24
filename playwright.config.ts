import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true,
  },
  projects: [
    {
      name: 'chromium-system',
      use: {
        browserName: 'chromium',
        launchOptions: {
          executablePath: '/usr/bin/chromium', // adjust
        },
      },
    },
    {
      name: 'firefox-system',
      use: {
        browserName: 'firefox',
        launchOptions: {
          executablePath: '/usr/bin/firefox', // adjust
        },
      },
    },
  ],
});
