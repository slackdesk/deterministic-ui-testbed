# Architecture

## Components

### Playwright
- Launches browser (Chromium/Firefox/WebKit)
- Navigates to URL
- Captures:
  - title / h1
  - HTTP status + final URL
  - DOM-ready timings
  - console errors
  - page errors (exceptions)

### OpenClaw
- Runs the “agent loop”
- Provides **tool execution** (file reads, browser actions, orchestration)
- Lets you standardize prompts into workflows

### Ollama
- Local model host
- Must use a **tool-capable** model for OpenClaw workflows
  - Example: `qwen2.5:1.5b-instruct` (tool calls supported in your tests)

## Data flow

1. OpenClaw receives a “smoke test” request (URL).
2. Agent prompts the model to run a workflow.
3. Model requests tool calls (e.g., run Playwright script).
4. Playwright returns structured JSON.
5. Model returns a final compact JSON (no extra text).

## Determinism tactics

- Force stable output schema (fixed keys + types).
- Cap context and output tokens.
- Prefer direct signals over interpretation (counts, status codes, timing).
- Use **single-pass** summarization rules (no multi-turn drift).
