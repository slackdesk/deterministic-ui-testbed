# Smoke Test Agent

Goal: Run a deterministic smoke test for a URL.

Steps:
1. Use the Playwright runner
2. Return ONLY the JSON contract
3. Do not explain

Output contract:
{ ok, title, h1, http_status }