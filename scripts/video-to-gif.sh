#!/usr/bin/env bash
set -euo pipefail

WEBM="${1:?pass .webm path}"
OUT="${2:-demos/demo.gif}"

mkdir -p "$(dirname "$OUT")"

ffmpeg -y -i "$WEBM" \
  -vf "fps=12,scale=1200:-1:flags=lanczos" \
  "$OUT"

echo "Wrote $OUT"