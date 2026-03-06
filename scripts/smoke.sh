#!/usr/bin/env bash
set -euo pipefail

URL="${1:-}"
if [[ -z "${URL}" ]]; then
  echo "Usage: $0 <URL>" >&2
  exit 2
fi

# Ensure we run from repo root (where package.json is).
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${REPO_ROOT}"

# Use node + playwright directly (avoids Playwright test runner chatter).
node <<'NODE' "${URL}"
const url = process.argv[2];

function nowMs() { return Date.now(); }

(async () => {
  let browser;
  let consoleErrors = 0;
  let pageErrors = 0;

  // Default JSON contract (in case anything fails)
  const out = {
    url: url || "",
    ok: false,
    title: "",
    h1: "",
    http_status: 0,
    final_url: url || "",
    dom_ready_ms: 0,
    console_errors: 0,
    page_errors: 0
  };

  try {
    const { chromium } = require('playwright');

    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors++;
    });

    page.on('pageerror', () => {
      pageErrors++;
    });

    const start = nowMs();
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    const domReady = nowMs() - start;

    const status = response ? response.status() : 0;

    let title = "";
    try { title = await page.title(); } catch {}

    let h1 = "";
    try {
      const t = await page.locator('h1').first().textContent({ timeout: 2000 });
      h1 = (t || "").trim();
    } catch {}

    out.url = url;
    out.title = title || "";
    out.h1 = h1 || "";
    out.http_status = status || 0;
    out.final_url = page.url() || url;
    out.dom_ready_ms = Number.isFinite(domReady) ? domReady : 0;
    out.console_errors = consoleErrors;
    out.page_errors = pageErrors;
    out.ok = (status > 0 && status < 400 && pageErrors === 0);

  } catch (e) {
    // Keep out.ok=false and emit contract anyway.
    out.console_errors = consoleErrors;
    out.page_errors = pageErrors + 1; // treat crash as a page error signal
  } finally {
    try { if (browser) await browser.close(); } catch {}
  }

  process.stdout.write(JSON.stringify(out));
})();
NODE