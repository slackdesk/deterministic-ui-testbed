# deterministic-ui-testbed

AI-driven browser automation experiments using **OpenClaw + Playwright**.

This repository demonstrates how **LLM prompts can generate and execute deterministic UI tests**.

The goal is simple:

**Prompt → Browser Automation → Deterministic JSON QA Signal**

---

# 🚀 What This Project Demonstrates

Two core automation prompts:

### Prompt A — Self-Driving Smoke Test

Runs a Playwright smoke test and returns a **strict JSON contract** describing page health.

Example output:

```json
{
"url":"https://slackdesk.org/index.html",
"ok":true,
"title":"SlackDesk | Open-Source AI Tools",
"h1":"Welcome to SlackDesk",
"http_status":200,
"final_url":"https://slackdesk.org/index.html",
"dom_ready_ms":350,
"console_errors":0,
"page_errors":0
}
```

---

### Prompt B — Generate Playwright Tests From a User Story

Example prompt:

> "As a visitor I can load the homepage and navigate to Playground."

The agent automatically:

1. Generates Playwright tests
2. Executes them
3. Produces artifacts (screenshots, traces, reports)

---

# 🧠 Why This Matters

AI agents can now:

• generate browser automation
• execute tests
• collect deterministic signals
• validate UI health automatically

This opens the door to **AI-assisted QA systems**.

---

# 🏗 Architecture

```
Prompt
   ↓
OpenClaw Agent
   ↓
Playwright Browser Automation
   ↓
Deterministic JSON Result
   ↓
CI / QA Signal
```

---

# 📦 Install

```bash
npm install
npx playwright install
```

---

# ▶ Run Tests

```bash
npx playwright test
```

---

# 🧪 Run Smoke Pipeline

```bash
./scripts/smoke.sh https://slackdesk.org/index.html
```

---

# 📂 Project Structure

```
deterministic-ui-testbed
│
├── prompts
│   ├── prompt-a-smoke-agent.md
│   └── prompt-b-generate-tests.md
│
├── tests
│   ├── smoke.spec.ts
│   └── navigation.spec.ts
│
├── scripts
│   ├── smoke.sh
│   └── smoke-check.py
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

# 🧪 Tech Stack

* Playwright
* Node.js
* OpenClaw Agents
* Deterministic UI testing patterns

---

# 🔬 Experimentation Goals

This repo explores:

• AI-generated test automation
• deterministic UI smoke testing
• prompt-driven QA workflows

---

# 🧑‍💻 Author

QA automation engineer exploring **AI-assisted testing systems**.

Connect with me on LinkedIn if you're experimenting with similar ideas.
