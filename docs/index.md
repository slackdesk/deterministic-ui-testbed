# Deterministic UI Testbed

This project is a small testbed for **deterministic UI smoke tests** that can be run locally and in CI.

## Why deterministic?

Determinism helps you:
- diff outputs between runs
- avoid flaky “it passed on my machine”
- keep smoke tests fast and high-signal

## What “interop” means here

- **Playwright** drives the browser and returns measurable signals.
- **OpenClaw** orchestrates the steps (and can call tools).
- **Ollama** provides a local LLM that can decide which checks to run and how to summarize results.

Next: see **Interop POC** for a minimal end-to-end demo.
