# Capability: Smoke multiple URLs (JSON array)

**Goal:** Smoke-test a short list of URLs and return results as a JSON array **only**.

## Input
- `URLS`: 2–10 URLs

## Output (STRICT)
Return **ONLY** a JSON array of objects:

```json
[
  {"url":"","ok":true,"title":"","h1":"","http_status":0,"final_url":"","dom_ready_ms":0,"console_errors":0,"page_errors":0}
]
```

## Prompt (Terminal-first)
You are running inside the `deterministic-ui-testbed` repository.

For each URL in `URLS`:
- Run: `./scripts/smoke.sh "<URL>" | python scripts/smoke-check.py`
- Collect the JSON object (one per URL)

Rules:
- Return JSON array only, no markdown.
- Preserve the order of inputs.
- If a URL fails hard, return an object with `ok:false` and populate what you can (at minimum `url` and `ok`).

**URLS:**
- <URL_1>
- <URL_2>
- <URL_3>
