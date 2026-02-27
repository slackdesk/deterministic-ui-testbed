#!/usr/bin/env node
import { spawnSync } from "node:child_process";

function fail(url) {
  return {
    url,
    ok: false,
    title: "",
    h1: "",
    http_status: 0,
    final_url: "",
    dom_ready_ms: 0,
    console_errors: 0,
    page_errors: 0,
  };
}

const input = process.stdin.read?.() ?? ""; // may be empty in some runners
let args;
try {
  args = input ? JSON.parse(input) : {};
} catch {
  args = {};
}

const url = args.url || process.argv[2] || "https://example.com";

// Run: ./scripts/smoke.sh <URL> | python scripts/smoke-check.py
const bash = spawnSync("bash", ["-lc", `./scripts/smoke.sh "${url}" | python scripts/smoke-check.py`], {
  encoding: "utf8",
  stdio: ["ignore", "pipe", "pipe"],
});

const stdout = (bash.stdout || "").trim();

// The pipeline should already output JSON. If not, return deterministic failure JSON.
try {
  const obj = JSON.parse(stdout);
  process.stdout.write(JSON.stringify(obj));
} catch {
  process.stdout.write(JSON.stringify(fail(url)));
  // optional: you can log stderr to a file, but don’t print it (breaks JSON-only contracts)
}