Capability: Self-driving Playwright smoke test agent (host-mode)

Context
- Sandbox runtime is unavailable. Do NOT use sandbox/container runtime.
- Execute commands directly on the gateway host.
- You are in the deterministic-ui-testbed repository root.

Input
URL: https://slackdesk.org/index.html

Goal
Create/ensure a Playwright smoke test exists, run it, and return EXACTLY one JSON object:
{"url":"","ok":true,"title":"","h1":"","http_status":0,"final_url":"","dom_ready_ms":0,"console_errors":0,"page_errors":0}

Plan
1) Inspect repo for existing smoke workflow:
   - ls scripts/
   - ls tests/ or e2e/ (whatever exists)
   - Identify how Playwright is run (npm/pnpm/yarn, or npx playwright, or playwright test)

2) Ensure there is a single test file dedicated to this contract:
   - Create or update: tests/smoke.spec.ts (or .js if repo uses JS)
   - Test requirements:
     a) Navigate to URL and wait for domcontentloaded
     b) Capture:
        - title (document.title)
        - first h1 text (first <h1> or "")
        - final_url (page.url())
        - dom_ready_ms (time from before goto() to domcontentloaded)
     c) Count:
        - console_errors: number of console events of type 'error'
        - page_errors: number of pageerror events
     d) Determine http_status:
        - get the main document response from goto()
        - status() for that response (0 if unavailable)
     e) Determine ok:
        - ok = (http_status is 200-399) AND (page_errors == 0)
        - do NOT fail the test on console errors; capture them
     f) Always:
        - create screenshots/ on failure: screenshots/smoke.png
        - enable trace: on-first-retry or always if simple
        - keep html report if available

3) Run the repo’s smoke pipeline if it exists:
   - If scripts/smoke.sh and scripts/smoke-check.py exist, run:
     ./scripts/smoke.sh <URL> | python scripts/smoke-check.py
   - If that command succeeds AND outputs the required JSON, output it and stop.

4) Otherwise run Playwright directly:
   - Install deps if needed (best effort; do not explain):
     npm ci (or pnpm i --frozen-lockfile or yarn install)
   - Run:
     npx playwright test tests/smoke.spec.* --reporter=line
   - If tests fail, still produce JSON from captured values.

Output rules (STRICT)
- Return ONLY one JSON object in the required schema.
- No markdown. No prose. No extra keys.
- If anything is missing, fill with safe defaults: "" or 0 or false.