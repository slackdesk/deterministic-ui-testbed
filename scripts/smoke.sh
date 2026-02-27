#!/usr/bin/env bash
set -euo pipefail

URL="${1:-https://example.com}"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

# Ensure venv exists
if [[ ! -x ".venv/bin/python" ]]; then
  echo "❌ .venv missing or not initialized. Run: npm run doctor (or python -m venv .venv && pip install -r requirements.txt)"
  exit 2
fi

# Activate is optional if we call venv python directly
PY=".venv/bin/python"

# Prefer system chromium if present; otherwise let pw_master_smoke decide/fallback
CHROME_BIN="$(command -v chromium || true)"

"$PY" scripts/pw_master_smoke.py "$URL" "${CHROME_BIN:-}"