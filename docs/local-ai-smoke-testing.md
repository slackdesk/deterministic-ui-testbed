🧪 Deterministic UI Testbed — Local Agent Smoke Workflow
Overview

This project provides a fully local, deterministic UI smoke-testing workflow powered by:

OpenClaw → agent runtime + browser control

Ollama → local LLM provider

Tool-calling model (Qwen 2.5 Instruct) → deterministic structured actions

The goal is:

Reproducible UI validation using a single natural-language “master smoke prompt” with zero cloud dependencies.

🧱 Architecture
Master Prompt
     ↓
OpenClaw Embedded Agent
     ↓ (tool calls only — no free-text)
Browser Control Skill
     ↓
Structured JSON Result

Key properties:

Deterministic

Tool-only execution

Machine-parsable output

CI-friendly

⚙️ Verified Working Stack
Ollama
ollama version
# 0.15.4
OpenClaw
openclaw --version
# 2026.2.22-2
Tool-capable model
qwen2.5:1.5b-instruct

Why this model:

✅ Supports tool calling

✅ Fits in low-VRAM environments

❌ No fake JSON in content

❌ No hallucinated tool output

🧠 Why Not Other Models?
Model	Result
dolphin-mixtral	❌ no tool support
llama3	❌ no tool support
wizard-vicuna	❌ no tool support
qwen2.5-coder	⚠️ prints JSON instead of tool call
qwen2.5-instruct	✅ correct tool calls
🔑 Required Environment
export OLLAMA_API_KEY=ollama-local
🧪 Tool-Calling Validation

Minimal proof:

Call ping(x=1)

Expected result:

tool_calls → ping { "x": 1 }

This confirms:

OpenClaw ↔ Ollama wiring

model tool support

deterministic execution path

🌐 Master Smoke Prompt
Smoke test https://slackdesk.org

Steps:
1. Open the URL
2. Wait for network idle
3. Capture:
   - document.title
   - first <h1>
   - number of links
4. Fail if page does not load

Return ONLY:

{
  "ok": true|false,
  "title": "",
  "h1": "",
  "links": 0,
  "error": ""
}
✅ Example Use Cases

Personal site health check

Post-deploy validation

Local CI smoke runs

Agent regression testing

Deterministic UI research

🚀 Running the Smoke Test

From OpenClaw chat:

Smoke test my personal website

or

Smoke test https://slackdesk.org
📊 Deterministic Output Contract

The agent must return:

{
  "ok": true,
  "title": "…",
  "h1": "…",
  "links": 12,
  "error": ""
}

This makes it:

CI-parsable

diff-friendly

non-flaky

🧩 Design Principles

Tools > text

JSON > prose

Local > cloud

Deterministic > “smart”

🛠 Troubleshooting
“model does not support tools”

Wrong model — switch to:

qwen2.5:1.5b-instruct
“Unknown model / provider not registered”
export OLLAMA_API_KEY=ollama-local
Config errors
openclaw doctor --fix
📈 Next Steps (Roadmap)

 CI runner profile

 Golden snapshot comparison

 Multi-URL smoke matrix

 Performance timing metrics

 Visual diff skill

🧬 Why This Matters

This testbed demonstrates:

A fully local, deterministic, tool-driven UI testing workflow using small LLMs.

Which unlocks:

reproducible agent testing

offline QA automation

research into non-flaky LLM execution

🙌 Credits / Context

Built and validated on:

Slackware Linux

GTX 1070

OpenClaw local mode

Ollama CPU/GPU hybrid