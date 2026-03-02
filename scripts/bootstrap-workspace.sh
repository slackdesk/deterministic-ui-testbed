#!/usr/bin/env bash
set -euo pipefail

# Repo root (works even if called from elsewhere)
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

WS="${OPENCLAW_WORKSPACE:-$HOME/.openclaw/workspace}"
MEM_DIR="$WS/memory"
TODAY="$(date +%F)"

mkdir -p "$MEM_DIR"

# WORKFLOW_AUTO.md
if [[ ! -f "$WS/WORKFLOW_AUTO.md" ]]; then
  cat > "$WS/WORKFLOW_AUTO.md" <<'EOF'
# WORKFLOW_AUTO.md

## Startup Protocol (Deterministic UI Testbed)

1) Prefer registered tools (OpenClaw skills) over ad-hoc shell fallbacks.
2) Never "simulate" smoke results. If tools aren't available, return an explicit failure JSON from the pipeline.
3) Smoke tests must return JSON-only (no prose, no markdown).

## Golden Command (Repo-root)
./scripts/smoke.sh <URL> | python scripts/smoke-check.py

## Output Contract (STRICT)
Return ONLY:
{"url":"","ok":true,"title":"","h1":"","http_status":0,"final_url":"","dom_ready_ms":0,"console_errors":0,"page_errors":0}

## Notes
- If terminal execution is unavailable, use the browser controller via the Playwright CLI skill (if installed).
- Always capture final_url, status, and error counts when possible.
EOF
  echo "✅ created $WS/WORKFLOW_AUTO.md"
else
  echo "ℹ️ exists  $WS/WORKFLOW_AUTO.md"
fi

# MEMORY.md
if [[ ! -f "$WS/MEMORY.md" ]]; then
  cat > "$WS/MEMORY.md" <<'EOF'
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
EOF
  echo "✅ created $WS/MEMORY.md"
else
  echo "ℹ️ exists  $WS/MEMORY.md"
fi

# Today's memory file
if [[ ! -f "$MEM_DIR/$TODAY.md" ]]; then
  cat > "$MEM_DIR/$TODAY.md" <<EOF
# $TODAY

- Workspace bootstrap ran.
- Startup files guaranteed to exist.
EOF
  echo "✅ created $MEM_DIR/$TODAY.md"
else
  echo "ℹ️ exists  $MEM_DIR/$TODAY.md"
fi

# Optional: ensure AGENTS.md exists (nice to have)
if [[ ! -f "$WS/AGENTS.md" ]]; then
  cat > "$WS/AGENTS.md" <<'EOF'
# AGENTS.md (minimal)

Read on startup:
- WORKFLOW_AUTO.md
- MEMORY.md
- memory/YYYY-MM-DD.md (today + yesterday)
EOF
  echo "✅ created $WS/AGENTS.md"
else
  echo "ℹ️ exists  $WS/AGENTS.md"
fi
