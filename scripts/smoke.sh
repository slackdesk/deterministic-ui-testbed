#!/usr/bin/env bash
set -euo pipefail

URL="${1:-https://example.com}"

# Prefer system chromium if present, else let Playwright resolve
BROWSER_BIN="${BROWSER_BIN:-}"

if [[ -z "${BROWSER_BIN}" ]]; then
  if command -v chromium >/dev/null 2>&1; then
    BROWSER_BIN="$(command -v chromium)"
  elif command -v chromium-browser >/dev/null 2>&1; then
    BROWSER_BIN="$(command -v chromium-browser)"
  else
    BROWSER_BIN=""
  fi
fi

if [[ -n "${BROWSER_BIN}" ]]; then
  python scripts/pw-master-smoke.py "$URL" "$BROWSER_BIN"
else
  python scripts/pw-master-smoke.py "$URL"
fi
