# Deterministic UI Testbed

![CI](https://github.com/slackdesk/deterministic-ui-testbed/actions/workflows/ci.yml/badge.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-green)
![Python](https://img.shields.io/badge/python-3.10%2B-blue)
![License](https://img.shields.io/github/license/slackdesk/deterministic-ui-testbed)

Deterministic, machine-verifiable browser testing powered by:

- 🧭 Playwright (execution)
- 🧠 OpenClaw (agent orchestration)
- 🦙 Ollama (local LLM reasoning)

This project proves that UI tests can return **structured JSON contracts instead of flaky text output**.

---

## ✨ Why this exists

Traditional Playwright tests:
- Assert inside test code
- Are hard to reuse across agents
- Produce human-oriented output

This testbed:

✔ Produces deterministic JSON  
✔ Is agent-readable  
✔ Works with local LLMs  
✔ Enables autonomous UI validation  

---

## 🧱 Architecture


User / CI
│
▼
OpenClaw Agent
│ (tool call)
▼
Playwright Smoke Script (Python)
│
▼
Chromium (system)
│
▼
Deterministic JSON


LLM is used for:
- planning
- interpreting results
- chaining actions

NOT for browser control.

---

## 🚀 Quick Start (60 seconds)

### 1️⃣ Install system Chromium

Slackware example:

```bash
which chromium
2️⃣ Python environment
python -m venv venv
source venv/bin/activate
pip install playwright
playwright install
3️⃣ Run the master smoke test
python scripts/pw-master-smoke.py https://example.com "$(command -v chromium)"
✅ Example output
{
  "url": "https://example.com",
  "ok": true,
  "http_status": 200,
  "title": "Example Domain",
  "console_errors": 0,
  "page_errors": 0
}

This JSON is the test contract.

🤖 OpenClaw Integration

The agent calls the smoke test as a tool and receives:

pass/fail signal

structured metrics

no parsing required

🧪 Deterministic Contract

A test passes when:

HTTP 200

No console errors

No page errors

Everything else is data — not a crash.

🔬 Why not Playwright alone?

Because Playwright:

Executes
but does not

Reason

Decide

Summarize

Chain workflows

This project adds that missing layer.

🛣 Roadmap

 Multi-page flows

 Visual diff contract

 Performance budgets

 CI artifact dashboards

 Tool auto-discovery for agents

📂 Project Structure
scripts/
  pw-master-smoke.py

docs/
  architecture.md

.github/workflows/
  ci.yml
🧠 Model Compatibility

Tool-calling verified with:

✅ qwen2.5:1.5b-instruct

⚠️ qwen2.5-coder → text tool output

❌ llama3 → no tool support

📜 License

MIT


---

# 📄 2) docs/architecture.md

```markdown
# Architecture

## Roles

### Playwright
Executes the browser and produces deterministic JSON.

### OpenClaw
Agent runtime:
- decides what to run
- calls tools
- consumes structured output

### Ollama
Local reasoning engine:
- planning
- validation
- orchestration

---

## Execution Flow

1. Agent receives goal
2. Agent calls Playwright smoke tool
3. Tool returns JSON
4. Agent decides pass/fail

No HTML parsing by the LLM.
No screenshots required for correctness.

---

## Determinism Layer

The contract converts:

DOM → JSON → Decision

This removes:
- flaky selectors
- natural language ambiguity
- log scraping

---

## Why this matters

This enables:

- CI-native agents
- self-healing tests
- autonomous QA