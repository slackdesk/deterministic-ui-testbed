# Capability: UI selector stability audit (deterministic test authoring)

**Goal:** Inspect a page and recommend stable, deterministic selectors aligned with this project’s philosophy.

## Input
- `URL`
- `TARGETS`: what elements matter (buttons, form fields, nav links, etc.)

## Output (STRICT)
Return **ONLY** JSON:

```json
{
  "url": "",
  "findings": [
    {
      "element": "string description",
      "recommended_selector": "string",
      "why": "string",
      "risk": "LOW|MEDIUM|HIGH"
    }
  ],
  "general_recommendations": ["..."]
}
```

## Prompt (Browser-first)
1) Open `URL` and wait for `domcontentloaded`.
2) For each item in `TARGETS`, locate the relevant element(s).
3) Prefer these selector strategies (in order):
   - `data-testid` / `data-test` (best for determinism)
   - accessible role selectors (e.g., button with name)
   - label-based selectors for inputs
   - stable IDs (only if truly stable)
4) Avoid brittle selectors:
   - deep CSS chains
   - nth-child
   - text that will change (marketing copy)

Rules:
- Return JSON only.
- Make selector recommendations realistic for Playwright.

**URL:** <PASTE_URL_HERE>
**TARGETS:**
- <TARGET_1>
- <TARGET_2>
- <TARGET_3>
