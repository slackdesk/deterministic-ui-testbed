# Capability: Smoke a single URL (JSON-only contract)

**Goal:** Run your existing smoke workflow for one URL and return a single JSON object **only**.

## Input
- `URL`: the target to smoke test

## Output (STRICT)
Return **ONLY** one JSON object with keys:

```json
{"url":"","ok":true,"title":"","h1":"","http_status":0,"final_url":"","dom_ready_ms":0,"console_errors":0,"page_errors":0}
```

## Prompt (Terminal-first)
You are running inside the `deterministic-ui-testbed` repository.

1) Run the smoke pipeline:
- `./scripts/smoke.sh <URL> | python scripts/smoke-check.py`

2) If it fails, still return the JSON emitted by the pipeline (do not add prose).
3) Do not include any markdown, commentary, or extra keys.

**URL:** <PASTE_URL_HERE>

## Prompt (Browser-only fallback)
If terminal execution is not available:
- Open `<URL>` in the browser controller
- Wait for `domcontentloaded`
- Extract:
  - `title` (document title)
  - first `<h1>` text (empty string if missing)
  - count console errors and page errors if the tool exposes them
- Return the JSON object in the same schema above.
