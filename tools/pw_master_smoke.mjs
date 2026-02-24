#!/usr/bin/env node
import { chromium } from 'playwright';

const url = process.argv[2] || 'https://example.com';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

let consoleErrors = 0;
let pageErrors = 0;

page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors++; });
page.on('pageerror', () => { pageErrors++; });

const t0 = Date.now();
const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
const t1 = Date.now();

let h1 = '';
try { h1 = await page.locator('h1').first().textContent() || ''; } catch { h1 = ''; }

const out = {
  url,
  ok: resp ? (resp.status() >= 200 && resp.status() < 400) : false,
  http_status: resp ? resp.status() : null,
  final_url: resp ? resp.url() : null,
  title: await page.title(),
  h1,
  dom_ready_ms: (t1 - t0),
  console_errors: consoleErrors,
  page_errors: pageErrors,
};

console.log(JSON.stringify(out));
await browser.close();
