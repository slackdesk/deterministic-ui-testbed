// scripts/demo-runner.ts
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const url = process.argv[2] || 'https://slackdesk.org';
const outDir = process.argv[3] || 'videos';

async function runDemo() {
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    recordVideo: { dir: outDir, size: { width: 1280, height: 720 } },
    viewport: { width: 1280, height: 720 },
  });

  const page = await context.newPage();
  page.setDefaultTimeout(15000);

  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);

  // deterministic-ish: prefer stable selectors if you have them
  await page.getByRole('link', { name: /get started/i }).click().catch(() => {});
  await page.waitForTimeout(1200);

  await context.close();
  await browser.close();

  // helpful: print newest video file path
  const newest = fs.readdirSync(outDir)
    .filter(f => f.endsWith('.webm'))
    .map(f => ({ f, t: fs.statSync(path.join(outDir, f)).mtimeMs }))
    .sort((a, b) => b.t - a.t)[0];

  if (newest) console.log(`VIDEO=${path.join(outDir, newest.f)}`);
}

runDemo().catch(err => {
  console.error(err);
  process.exit(1);
});