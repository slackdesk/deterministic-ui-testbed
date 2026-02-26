# Capability: CI triage for deterministic smoke failures (GitHub Actions)

**Goal:** Given a failing CI log snippet, produce a deterministic fix checklist and (when appropriate) a patch plan.

## Input
- `LOG`: paste the relevant CI failure output
- `CONTEXT`: repo facts (OS, paths, command used)

## Output (STRICT)
Return **ONLY** JSON:

```json
{
  "summary": "one sentence",
  "root_cause_hypothesis": "string",
  "fix_steps": [
    {"step": "string", "why": "string"}
  ],
  "files_to_change": [
    {"path": "string", "change": "string"}
  ]
}
```

## Prompt
You are diagnosing failures for this workflow:

- CI runs `npm ci`
- then `npm run smoke`
- smoke pipeline invokes Python Playwright and/or system Chromium depending on configuration

Rules:
- Be deterministic: name exact commands, packages, file paths.
- If Playwright deps are missing, propose the lightest viable fix.
- Do not recommend “just use apt-get” if the environment doesn’t have it; instead propose actions-supported steps.

**CONTEXT:**
- Runner: ubuntu-latest
- Command: npm run smoke
- Repo: deterministic-ui-testbed

**LOG:**
<PASTE_LOG_HERE>
