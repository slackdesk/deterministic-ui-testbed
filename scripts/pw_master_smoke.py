import sys, json, time
from playwright.sync_api import sync_playwright

url = sys.argv[1] if len(sys.argv) > 1 else "https://example.com"
browser_path = sys.argv[2] if len(sys.argv) > 2 else None

OUT = {
    "url": url,
    "ok": False,
    "title": "",
    "h1": "",
    "http_status": None,
    "final_url": "",
    "dom_ready_ms": None,
    "console_errors": 0,
    "page_errors": 0,
}

t0 = time.time()

with sync_playwright() as p:
    counters = {
        "console_errors": 0,
        "page_errors": 0,
    }

    def on_console(msg):
        if msg.type == "error":
            counters["console_errors"] += 1

    def on_page_error(err):
        counters["page_errors"] += 1

    browser = p.chromium.launch(
        headless=True,
        executable_path=browser_path,
        args=["--no-sandbox"],
    )

    page = browser.new_page()
    page.on("console", on_console)
    page.on("pageerror", on_page_error)

    resp = page.goto(url, wait_until="domcontentloaded", timeout=30000)

    OUT["dom_ready_ms"] = int((time.time() - t0) * 1000)
    OUT["final_url"] = page.url
    OUT["http_status"] = resp.status if resp else None
    OUT["title"] = page.title() or ""

    try:
        h1 = page.locator("h1").first
        if h1.count():
            OUT["h1"] = (h1.text_content() or "").strip()
    except Exception:
        pass

    OUT["console_errors"] = counters["console_errors"]
    OUT["page_errors"] = counters["page_errors"]
    OUT["ok"] = (OUT["http_status"] is not None) and (OUT["http_status"] < 400)

    browser.close()

print(json.dumps(OUT, ensure_ascii=False))
