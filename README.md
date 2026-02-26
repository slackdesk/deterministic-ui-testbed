# Deterministic UI Testbed

**Flake-free, CI-safe browser smoke tests powered by Playwright + local AI.**

This project demonstrates how to turn UI automation into a **deterministic, reproducible system** that:

- produces **consistent JSON test outputs**
- survives **UI and environment drift**
- enables **AI-assisted test authoring without breaking CI**

---

## Why this matters

Traditional UI pipelines fail because they are:

- ❌ timing-sensitive  
- ❌ selector-fragile  
- ❌ hard to debug in CI  

This testbed shows a different model:

✅ Deterministic execution  
✅ Stable, diffable results  
✅ High-signal failure diagnostics  
✅ AI that accelerates authoring — not runtime risk  

---

## What this project demonstrates

- **Playwright** for reliable browser automation  
- **OpenClaw** as a tool-orchestrated workflow engine  
- **Ollama** for local, tool-calling LLMs  
- **CI-safe smoke testing** with a deterministic gate  

Result: the same test → the same structured output → every run.

---

## Example output

```json
{
  "url": "https://slackdesk.org",
  "ok": true,
  "http_status": 200,
  "dom_ready_ms": 802,
  "console_errors": 0,
  "page_errors": 0
}
```

This makes UI tests:

- loggable  
- alertable  
- trendable  
- automation-friendly  

---

## Key capabilities

- Deterministic UI smoke testing
- AI-generated Playwright tests (tool-driven, not free-form)
- Reproducible local + CI execution
- System Chromium fallback for unsupported distros
- JSON contracts for automation pipelines

---

## Architecture (high level)

```
OpenClaw
  → Ollama (intent → tool plan)
      → Playwright test generation
          → Playwright execution
              → Deterministic smoke gate
                  → Structured result
```

---

## Quickstart

### Node

```bash
npm install
npx playwright install chromium
npm test
```

### Python + system Chromium

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

python scripts/pw_master_smoke.py https://example.com "$(command -v chromium)"
```

---

## Repository layout

```
agents/     → AI workflows (version-controlled)
scripts/    → runtime glue
tests/      → deterministic execution
docs/       → architecture + demo
.github/    → CI pipeline
```

---

## Use cases

- CI smoke tests for production deploys
- Flake-free health checks for critical user journeys
- AI-assisted test authoring for QA teams
- Deterministic UI monitoring

---

## Status

Actively evolving as a **reference architecture for reliable UI automation**.
