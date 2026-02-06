# deterministic-ui-testbed

# Deterministic UI Testbed

A static reference application for designing and validating **team-adoptable UI test frameworks**.

This project intentionally removes backend, data, and environment variability so that test design decisions can focus on what actually matters: determinism, selector stability, readability, and debuggable failures.

---

## Why this project exists

UI test frameworks often fail not because of tooling, but because:

- applications are difficult to test reliably
- selectors are brittle or inconsistent
- failures are hard to debug in CI
- tests are hard to read, review, and extend
- local and CI behavior diverge

The Deterministic UI Testbed exists to **eliminate those variables by design** and provide a controlled target for exploring and validating browser automation patterns before applying them to real-world systems.

This is not an application under test — it is a **testability reference**.

---

## Design principles

### Deterministic by construction
- No backend services
- No external network calls
- No randomized data
- No time-based assertions
- All behavior is client-side and predictable

### Stable selectors everywhere
- Every interactive element includes a `data-testid`
- Accessibility selectors (`role`, `label`) are used where appropriate
- CSS and text selectors are avoided unless intentional

### Human-readable test intent
- Each UI section includes visible **Test Notes / Hints**
- Notes describe expected behavior and edge cases
- Notes themselves are testable, reinforcing documentation discipline

### Framework-agnostic
- Works with Playwright, Cypress, Selenium, or custom runners
- Does not assume a specific automation stack
- Designed to support both code-first and spec-first approaches

---

## Pages

### `/index.html`
Landing page providing:
- navigation
- basic widgets
- simple state changes

Includes:
- live clock (read-only UI)
- counter widget (increment / decrement)

**Typical use cases**
- smoke testing
- navigation verification
- basic state assertions

---

### `/playground.html`
Primary test surface containing multiple deterministic UI patterns:

#### Form validation
- required fields
- email format validation
- minimum message length
- simulated async submit (fixed latency)

#### Modal dialog
- open / close actions
- backdrop click handling
- confirm action updates page state

#### Tabs
- proper ARIA roles
- `aria-selected` state management
- mutually exclusive panel visibility

#### Accordion
- native `<details>` element
- deterministic open/close behavior

#### Filterable table
- client-side filtering
- deterministic empty state

#### File download
- static file for download verification

**Typical use cases**
- validation testing (error and success paths)
- UI state transitions
- accessibility selector usage
- browser download handling

---

## Selector conventions

Recommended selector priority:

1. Accessibility selectors  
   - `getByRole()`
   - `getByLabel()`
2. Test IDs  
   - `data-testid`
3. Text or CSS selectors (last resort)

**Guidelines**
- Prefer selectors that reflect user intent
- Avoid brittle structural selectors
- Treat selector stability as a first-class concern

---

## Test Notes / Hints pattern

Each component includes a visible note section that:

- documents expected behavior
- highlights edge cases
- guides test authors
- is itself selectable and testable

This enables:
- enforcing documentation standards
- asserting that requirements exist
- validating test intent alongside behavior
- future automation of test scaffolding

---

## Project structure


site/
index.html
playground.html
assets/
qa-playground.css
qa-playground.js
sample.txt


---

## Running locally

No build tools or dependencies are required.

From the project root:

```bash
python3 -m http.server 8080


Then open:

http://127.0.0.1:8080/

http://127.0.0.1:8080/playground.html

Deployment

The Deterministic UI Testbed is plain HTML, CSS, and JavaScript and can be hosted on any static platform:

nginx / Apache

GitHub Pages

Netlify

Cloudflare Pages

VPS static hosting

Deployment checklist

index.html and playground.html are in the web root

/assets/ is publicly accessible

The following paths load without errors:

/playground.html

/assets/qa-playground.css

/assets/qa-playground.js

/assets/sample.txt

Suggested smoke test coverage

Minimum recommended smoke suite:

Home page loads successfully

Navigation: Home → Playground

Counter increments and decrements

Form validation errors appear for invalid input

Form success appears for valid input

Modal confirm updates result indicator

Tab switching shows correct panel

Table filtering shows rows and empty state

File download initiates successfully

Extending the testbed

New components should remain:

deterministic

isolated

stable across runs

free of external dependencies

Good candidates:

multi-step wizards (static state)

toast notifications

accessibility-focused examples

client-side validation patterns

Avoid:

randomized values

time-based assertions

live APIs

non-deterministic animations

Intended audience

This project is designed for:

QA Engineers

SDETs

Test Automation Engineers

QA Leads evaluating framework patterns

It is especially useful for teams:

designing or refactoring UI automation frameworks

establishing selector and testability standards

improving CI reliability and debuggability

License

Choose a license appropriate to your goals:

MIT — permissive and simple

Apache-2.0 — explicit patent grant

Maintainer notes

When using this testbed to develop or evaluate a UI testing framework:

enforce selector policy early

default to trace and screenshot artifacts

introduce reusable flows carefully

keep tests readable and reviewable

prioritize CI stability over feature breadth