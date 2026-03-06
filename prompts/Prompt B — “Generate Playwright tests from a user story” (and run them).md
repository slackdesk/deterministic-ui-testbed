Capability: Generate + run Playwright tests (host-mode)

Sandbox
- Sandbox runtime unavailable. Execute directly on host.

Repo
deterministic-ui-testbed

User story
"As a visitor, I can load the homepage, see a primary heading, and navigate to the Playground page."

Acceptance criteria
- Homepage loads successfully (HTTP 2xx/3xx)
- Title contains "SlackDesk" (case-insensitive)
- First H1 exists and is visible
- A link or button containing "Playground" navigates to a page whose URL contains "playground" (case-insensitive)
- Capture screenshots and trace on failure

Tasks
1) Create tests:
   - tests/home.spec.ts: homepage assertions
   - tests/navigation.spec.ts: navigate to Playground
   - Add robust selectors (role-based first; fallback to text)
2) Add helpers:
   - tests/helpers/collectErrors.ts to count console/page errors
3) Update package scripts if needed:
   - "test:e2e": "playwright test"
4) Run:
   - npx playwright test
5) Summarize results:
   - show failing steps + where artifacts are stored

Output rules
- Provide concise command output + file paths created/changed.
- If anything fails, propose the smallest diff to fix it.