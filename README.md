⭐ If you find this experiment interesting, please consider starring the repo.
## 🧩 Test Fixtures (Local SlackDesk Pages)

This repository includes **local fixture pages** under `fixtures/slackdesk/` that mimic key elements of the SlackDesk website.

The fixtures allow Playwright tests to run against a **deterministic local environment** rather than relying on the live site.

## 🧭 Architecture

This project demonstrates a prompt-driven browser automation workflow.

![Architecture](docs/architecture.svg)

### Why fixtures are used

Testing directly against a live site can introduce instability due to:

* network latency
* CDN changes
* deployment updates
* third-party dependencies

By running tests against **local HTML fixtures**, the test results become:

* **deterministic**
* **reproducible**
* **fast**
* **offline-capable**

This is especially useful when demonstrating **AI-generated test automation workflows**.

### Fixture location

```
fixtures/
└── slackdesk/
    ├── index.html
    ├── playground.html
    ├── styles.css
    └── assets/
```

These pages contain simplified versions of SlackDesk UI components used by the tests:

* page titles
* `<h1>` headings
* navigation links
* buttons and interactive elements

### How fixtures are served

Playwright automatically launches a lightweight local server using the configuration in `playwright.config.ts`:

```bash
python3 -m http.server 4173 --directory fixtures/slackdesk
```

The tests then run against:

```
http://127.0.0.1:4173
```

### Example test flow

1. Start local fixture server
2. Load `/index.html`
3. Verify title and heading
4. Navigate to `/playground.html`
5. Validate UI elements

### When to use the live site

The repository also supports **optional live-site smoke testing**:

```
https://slackdesk.org/index.html
```

Live tests are useful for validating production deployments, but fixture-based tests are preferred for **repeatable automation demonstrations**.

### Design goal

The fixtures are intentionally minimal and exist only to support the following workflow:

```
Prompt
   ↓
AI Agent
   ↓
Playwright Automation
   ↓
Deterministic UI Signal
```

This makes the project easier to understand, reproduce, and extend.
