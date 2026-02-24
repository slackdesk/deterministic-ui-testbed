#!/usr/bin/env python3
"""Playwright master smoke (Python).

Usage:
  python tools/pw_master_smoke.py https://example.com /usr/bin/chromium

If the `chromium_path` is provided, we launch that binary. This helps on distros
where Playwright's downloaded browsers can't run due to missing shared libs.
"""

import json
import sys
import time
from playwright.sync_api import sync_playwright

def main():
    url = sys.argv[1] if len(sys.argv) > 1 else "https://example.com"
    chromium_path = sys.argv[2] if len(sys.argv) > 2 else None

    result = {
        "url": url,
        "ok": False,
        "title": None,
        "h1": None,
        "http_status": None,
        "final_url": None,
        "dom_ready_ms": None,
        "console_errors": 0,
        "page_errors": 0,
    }

    console_errors = 0
    page_errors = 0
    t0 = time.time()

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, executable_path=chromium_path)
        page = browser.new_page()

        def on_console(msg):
            nonlocal console_errors
            if msg.type == "error":
                console_errors += 1

        def on_page_error(_err):
            nonlocal page_errors
            page_errors += 1

        page.on("console", on_console)
        page.on("pageerror", on_page_error)

        resp = page.goto(url, wait_until="domcontentloaded", timeout=30000)
        t1 = time.time()

        result["dom_ready_ms"] = int((t1 - t0) * 1000)
        if resp is not None:
            result["http_status"] = resp.status
            result["final_url"] = resp.url

        result["title"] = page.title()
        try:
            result["h1"] = page.locator("h1").first.text_content() or ""
        except Exception:
            result["h1"] = ""

        result["console_errors"] = console_errors
        result["page_errors"] = page_errors
        result["ok"] = (result["http_status"] is not None and 200 <= result["http_status"] < 400)

        browser.close()

    print(json.dumps(result, separators=(",", ":"), ensure_ascii=False))

if __name__ == "__main__":
    main()
