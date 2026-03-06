import { test } from '@playwright/test';

test('deterministic smoke test', async ({ page }) => {

const url = process.env.URL || "https://slackdesk.org/index.html";

let consoleErrors = 0;
let pageErrors = 0;

page.on('console', msg => {
 if (msg.type() === 'error') consoleErrors++;
});

page.on('pageerror', () => {
 pageErrors++;
});

const start = Date.now();

const response = await page.goto(url, { waitUntil: 'domcontentloaded' });

const domReady = Date.now() - start;

const title = await page.title();

const h1 = await page.locator('h1').first().textContent().catch(() => "");

const result = {
 url,
 ok: response?.status()! < 400 && pageErrors === 0,
 title: title || "",
 h1: h1?.trim() || "",
 http_status: response?.status() || 0,
 final_url: page.url(),
 dom_ready_ms: domReady,
 console_errors: consoleErrors,
 page_errors: pageErrors
};

console.log(JSON.stringify(result));

});