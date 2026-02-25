# Deterministic UI Testbed

Deterministic, reproducible UI “smoke tests” that combine:

- **Playwright** for browser automation
- **OpenClaw** as an orchestration layer (tool calls, workflows)
- **Ollama** as the local LLM runtime (tool-capable models)

> Goal: run the same high-signal UI checks repeatedly and get **consistent JSON outputs** that are easy to diff, log, and automate.

---

## Badges

![CI](https://img.shields.io/github/actions/workflow/status/slackdesk/deterministic-ui-testbed/ci.yml?branch=main)
![License](https://img.shields.io/github/license/slackdesk/deterministic-ui-testbed)
![Last Commit](https://img.shields.io/github/last-commit/slackdesk/deterministic-ui-testbed)

---

## Quickstart  

### Option A — npm (Node Playwright)

```bash
npm install
npx playwright install chromium
npm test
```

### Option B — Python Playwright + system Chromium

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# If your distro is missing Playwright deps, use system Chromium:
python scripts/pw_master_smoke.py https://example.com "$(command -v chromium)"
```

---

## The Deterministic UI Test Workflow

OpenClaw chat
↓
Ollama (intent → tool plan)
↓
generate_playwright_test tool
↓
run_playwright_test tool
↓
smoke-check.py (deterministic gate)
↓
LLM summary

## What you get

- A **single “master smoke prompt”** workflow that:
  1. opens a page
  2. collects key metadata + error signals
  3. returns a compact, deterministic JSON record

Example output:

```json
{
  "url": "https://slackdesk.org",
  "ok": true,
  "title": "Deterministic UI Testbed",
  "h1": "",
  "http_status": 200,
  "final_url": "https://slackdesk.org/",
  "dom_ready_ms": 802,
  "console_errors": 0,
  "page_errors": 0
}
```

---

## Repo layout

```
.
├─ docs/                      # architecture + demo docs
├─ tools/                     # standalone scripts
├─ tests/                     # smoke tests / assertions
├─ .github/workflows/         # CI
└─ mkdocs.yml                 # docs site config
```

---

## Documentation

- **Architecture:** `docs/architecture.md`
- **Demo walkthrough:** `docs/demo.md`
- **Docs site:** `mkdocs.yml` + `docs/index.md`

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

## License

See [LICENSE](LICENSE).
