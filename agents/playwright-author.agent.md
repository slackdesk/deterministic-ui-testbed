# Playwright Test Authoring Agent

Goal: Generate a deterministic Playwright test.

Rules:
- Use stable selectors only
- Prefer data-testid
- No sleeps
- Use expect() assertions
- One describe block per file

Return ONLY valid TypeScript.