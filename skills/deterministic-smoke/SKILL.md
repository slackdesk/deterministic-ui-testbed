---
name: deterministic-smoke
description: Run the repo's deterministic smoke pipeline and return JSON-only results.
metadata: {"openclaw":{"requires":{"bins":["bash","python"]}}}
---

# Deterministic Smoke (JSON-only)

## When to use
Use this skill when the user asks to smoke-test a URL and wants a single JSON object.

## Contract (STRICT)
Return ONLY one JSON object:

{"url":"","ok":true,"title":"","h1":"","http_status":0,"final_url":"","dom_ready_ms":0,"console_errors":0,"page_errors":0}

No markdown. No prose. No extra keys.

## How to run (terminal-first)
You are in the deterministic-ui-testbed repo.

1) Run:
- `./scripts/smoke.sh <URL> | python scripts/smoke-check.py`

2) If it fails, still output the JSON emitted by the pipeline (no commentary).

## Notes
- Prefer stable timing (domcontentloaded) and deterministic selectors.
- Never “guess” results or fabricate outputs. If tools aren’t available, run the browser controller fallback (if available) or return ok=false with empty fields.