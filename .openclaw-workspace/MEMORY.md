# MEMORY.md (Long-term)

Project: Deterministic UI Testbed
Stack: Playwright + OpenClaw + Ollama (tool-capable models)

Rules:
- Determinism first: stable outputs, CI-safe, diffable JSON.
- Do not fabricate smoke results.
- If something fails, return the pipeline JSON (or a valid schema with ok=false).

Known gotchas:
- Some Ollama models do NOT support tools.
- Workspace startup files must exist: WORKFLOW_AUTO.md and memory/YYYY-MM-DD.md.
