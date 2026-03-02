# WORKFLOW_AUTO.md

## Startup Protocol (Deterministic UI Testbed)

1) Prefer registered tools (OpenClaw skills) over ad-hoc shell fallbacks.
2) Never "simulate" smoke results. If tools aren't available, return an explicit failure JSON from the pipeline.
3) Smoke tests must return JSON-only (no prose, no markdown).

## Golden Command (Repo-root)
./scripts/smoke.sh <URL> | python scripts/smoke-check.py

## Output Contract (STRICT)
Return ONLY:
{"url":"","ok":true,"title":"","h1":"","http_status":0,"final_url":"","dom_ready_ms":0,"console_errors":0,"page_errors":0}

## Notes
- If terminal execution is unavailable, use the browser controller via the Playwright CLI skill (if installed).
- Always capture final_url, status, and error counts when possible.
