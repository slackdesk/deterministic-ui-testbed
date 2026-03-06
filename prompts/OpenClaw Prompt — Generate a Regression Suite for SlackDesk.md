Capability: Generate a complete Playwright regression suite for the local SlackDesk fixture site

Context
- Repository: deterministic-ui-testbed
- Target site is the local SlackDesk fixture pages under fixtures/slackdesk
- Base URL comes from Playwright config
- Use deterministic selectors and readable tests

Goal
Generate a full regression suite for all visible and testable features in the SlackDesk fixture site.

Must cover
- hero title and CTA buttons
- navigation links
- tabs
- accordions
- form validation and valid submit
- newsletter signup validation
- counter increment/decrement
- progress slider updates
- feature toggle state changes
- modal open/close
- drawer open/close
- toast notifications
- async load simulation
- table search/filter
- badge and status text updates

Create
- tests/regression/smoke.spec.ts
- tests/regression/navigation.spec.ts
- tests/regression/forms.spec.ts
- tests/regression/components.spec.ts
- tests/regression/data.spec.ts

Rules
- Use getByRole, getByLabel, and data-testid wherever possible
- Keep tests deterministic and recruiter-demo friendly
- Use clear assertions for visible behavior
- Do not include placeholder tests

Output
Summarize files created and what each file covers.