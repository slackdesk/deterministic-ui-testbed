#!/usr/bin/env bash

set -e

echo "-------------------------------------"
echo "Deterministic UI Testbed Cleanup Tool"
echo "-------------------------------------"
echo

MODE=${1:-dry}

echo "Mode: $MODE"
echo

# Directories safe to remove for showcase repo
DIRS=(
".venv"
".vscode"
"node_modules"
"docker"
"docs"
"assets"
"media"
"videos"
"test-results"
"agents"
"app"
"playwright-report"
)

# Files safe to remove
FILES=(
"CHANGELOG.md"
"CODE_OF_CONDUCT.md"
"CONTRIBUTING.md"
"SECURITY.md"
"mkdocs.yml"
)

remove_dir() {
    if [ -d "$1" ]; then
        if [ "$MODE" = "apply" ]; then
            echo "Removing directory: $1"
            rm -rf "$1"
        else
            echo "[DRY RUN] Would remove directory: $1"
        fi
    fi
}

remove_file() {
    if [ -f "$1" ]; then
        if [ "$MODE" = "apply" ]; then
            echo "Removing file: $1"
            rm -f "$1"
        else
            echo "[DRY RUN] Would remove file: $1"
        fi
    fi
}

echo "Scanning directories..."
echo

for d in "${DIRS[@]}"; do
    remove_dir "$d"
done

echo
echo "Scanning files..."
echo

for f in "${FILES[@]}"; do
    remove_file "$f"
done

echo
echo "Ensuring prompts directory exists..."

if [ "$MODE" = "apply" ]; then
    mkdir -p prompts
else
    echo "[DRY RUN] Would create: prompts/"
fi

echo
echo "Cleanup complete."

if [ "$MODE" != "apply" ]; then
    echo
    echo "This was a DRY RUN."
    echo "To apply changes run:"
    echo
    echo "   ./cleanup-showcase.sh apply"
fi
