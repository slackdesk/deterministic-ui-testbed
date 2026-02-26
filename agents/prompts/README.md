# OpenClaw Prompt Pack (Starter)

A small, production-ready set of **example prompts** you can drop into the repo to demonstrate how OpenClaw can orchestrate your existing smoke tooling.

## What these prompts assume

- Your repo already has:
  - `scripts/smoke.sh`
  - `scripts/pw-master-smoke.py`
  - `scripts/smoke-check.py`
- Your smoke pipeline emits a single JSON object similar to:

```json
{
  "url": "https://example.com",
  "ok": true,
  "title": "Example Domain",
  "h1": "Example Domain",
  "http_status": 200,
  "final_url": "https://example.com/",
  "dom_ready_ms": 802,
  "console_errors": 0,
  "page_errors": 0
}
```

> Tip: In OpenClaw, these prompts work best when the agent can use **terminal/command** execution (or whatever local command skill you’ve enabled). If you’re only using browser-control, use the “Browser-only” variants included in each prompt.

## Files

- `smoke.single-url.md` — one URL, returns JSON only.
- `smoke.multi-url.md` — multiple URLs, returns a JSON array.
- `smoke.regression-quick.md` — “quick regression” run + brief diagnosis.
- `ui.selector-audit.md` — stability audit (IDs, data-testid, accessibility roles).
- `ci.triage-smoke-fail.md` — paste a CI log, get a deterministic fix list.

## Conventions

- Output contracts are strict (JSON only when requested).
- Prompts are named by capability and written as “copy/paste into chat”.
