# CI

You can run smoke tests in GitHub Actions.

## Notes

- Playwright browsers may require system dependencies.
- If your runner environment is minimal, prefer:
  - Python Playwright + system Chromium, OR
  - run inside a container image that includes deps.

## Starter workflow

See `.github/workflows/ci.yml`.
