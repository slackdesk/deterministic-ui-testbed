import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true,
    baseURL: 'http://127.0.0.1:5173'
  },
  webServer: {
    command: 'python3 -m http.server 5173 --directory .',
    port: 5173,
    reuseExistingServer: false,
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
