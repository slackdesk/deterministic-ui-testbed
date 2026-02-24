# Demo walkthrough

## 1) Run the Playwright master smoke locally

### Python (recommended on distros missing Playwright deps)
```bash
python tools/pw_master_smoke.py https://slackdesk.org "$(command -v chromium)"
```

### Node
```bash
node tools/pw_master_smoke.mjs https://slackdesk.org
```

## 2) Run the same through OpenClaw

In OpenClaw, use a prompt like:

> Smoke test https://slackdesk.org and return ONLY JSON.

OpenClaw should orchestrate:
- browser open
- extraction
- final JSON response

## 3) CI
See `docs/ci.md` for a starter workflow.
