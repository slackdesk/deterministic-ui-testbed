# Capability: Quick regression smoke + deterministic diagnosis

**Goal:** Run the smoke pipeline for one URL, then (only if failing) provide a short, deterministic fix list.

## Input
- `URL`

## Output (STRICT)
Return **ONLY** a JSON object:

```json
{
  "result": {"url":"","ok":true,"title":"","h1":"","http_status":0,"final_url":"","dom_ready_ms":0,"console_errors":0,"page_errors":0},
  "diagnosis": {
    "category": "PASS|NAVIGATION_TIMEOUT|HTTP_ERROR|JS_CONSOLE|RUNTIME_EXCEPTION|UNKNOWN",
    "next_steps": ["..."]
  }
}
```

## Prompt (Terminal-first)
You are running inside the `deterministic-ui-testbed` repository.

1) Run:
`./scripts/smoke.sh "<URL>" | python scripts/smoke-check.py`

2) Parse the emitted JSON into `result`.

3) If `result.ok == true`:
- Set `diagnosis.category="PASS"`
- Set `diagnosis.next_steps=[]`

4) If `result.ok == false`:
- Set `diagnosis.category` based on the strongest signal you can infer from the output/logs
- Provide 3–7 deterministic next steps (no vague advice)

Rules:
- Return JSON only (no markdown).
- Keep next_steps actionable (commands, file paths, config toggles).

**URL:** <PASTE_URL_HERE>
