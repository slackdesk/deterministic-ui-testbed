#!/usr/bin/env bash
set -e

echo "🔍 Checking environment"

command -v python3 >/dev/null || { echo "❌ python3 missing"; exit 1; }
command -v chromium >/dev/null || { echo "❌ chromium missing"; exit 1; }

[ -d ".venv" ] || { echo "❌ .venv missing"; exit 1; }

source .venv/bin/activate

python -c "import playwright" || { echo "❌ playwright not installed"; exit 1; }

echo "✅ Environment OK"