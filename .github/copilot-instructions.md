# GitHub Copilot — Repository Instructions

> Repository-wide instructions for all GitHub Copilot features (chat, code completion, code review, cloud agent).

---

## Project Summary

This repository is the **ActualMetrics QA Agentic Solution** — an AI-assisted, automated end-to-end test framework that validates the **ZippyKind** website at [https://zippykind.com/](https://zippykind.com/).

- **Test Framework:** [Playwright](https://playwright.dev/) (TypeScript)
- **Design Pattern:** Page Object Model (POM)
- **Paradigm:** Object-Oriented Programming (OOP)
- **CI/CD:** GitHub Actions
- **Node version:** 18+
- **Package manager:** npm

---

## Repository Structure

```
.
├── .github/
│   ├── copilot-instructions.md      # This file
│   ├── instructions/                # Path-specific Copilot instructions
│   ├── workflows/                   # GitHub Actions CI pipelines
│   └── README.md                    # .github folder guide
├── pages/                           # Page Object Models (POM)
├── tests/
│   ├── smoke/
│   ├── functional/
│   └── regression/
├── fixtures/                        # Shared test fixtures & test data
├── utils/                           # Utility/helper functions
├── AGENTS.md                        # AI agent task instructions
├── Skills.md                        # Copilot skill definitions
├── playwright.config.ts
├── package.json
└── README.md
```

---

## Coding Standards & Conventions

### General
- Use **TypeScript** for all test and page-object code. Avoid `any`.
- Follow **OOP principles**: encapsulation, inheritance, and single responsibility.
- Every file should export a single class or a small cohesive set of utilities.
- Use `async/await` throughout — never `.then()` chains in test code.
- Prefer `const` over `let`; never use `var`.

### Page Object Models (POM)
- All page objects live in `pages/` and extend a shared `BasePage`.
- Each POM class corresponds to exactly one page or major UI component.
- Locators must be declared as `readonly` class properties at the top of the class.
- Use Playwright's `page.getByRole()`, `page.getByLabel()`, or `page.getByTestId()` in preference to CSS/XPath selectors.
- Navigation methods (e.g., `goto()`) and interaction methods (e.g., `clickLogin()`) belong in the POM — assertions belong in the test file.
- POM method names use `camelCase` verb-noun form: `fillEmailField()`, `clickSubmitButton()`, `getErrorMessage()`.

### Tests
- Test files live in `tests/<category>/` and use the `.spec.ts` suffix.
- Use `test.describe()` blocks to group related scenarios.
- Each `test()` block should test one logical scenario.
- Shared setup goes in `beforeEach` / `afterEach` — not duplicated across tests.
- Test titles follow the format: `"[Feature]: [expected behaviour] when [condition]"`.
- Never hardcode URLs or credentials in test files — use `playwright.config.ts` `baseURL` and environment variables (`.env` / `process.env`).

### Fixtures & Test Data
- Reusable Playwright fixtures live in `fixtures/`.
- Test data (JSON/CSV) lives in `fixtures/data/`.
- Sensitive values (passwords, tokens) are **never committed** — use `process.env`.

### Assertions
- Prefer Playwright's built-in `expect` auto-waiting assertions (`toBeVisible()`, `toHaveText()`, etc.).
- Avoid `waitForTimeout` — use `waitForSelector` or assertion retry instead.

---

## Build & Validation Commands

```bash
# Install dependencies (always run after pulling changes)
npm install

# Install Playwright browsers
npx playwright install --with-deps

# Run all tests (headless)
npx playwright test

# Run a single test file
npx playwright test tests/smoke/homepage.spec.ts

# Run with UI mode
npx playwright test --ui

# Generate HTML report
npx playwright show-report

# TypeScript type-check (no emit)
npx tsc --noEmit

# Lint
npm run lint
```

---

## Environment Variables

| Variable         | Purpose                          |
|------------------|----------------------------------|
| `BASE_URL`       | Override base URL (default: `https://zippykind.com`) |
| `TEST_USERNAME`  | Login username for authenticated tests |
| `TEST_PASSWORD`  | Login password for authenticated tests |

Copy `.env.example` to `.env` and fill in values locally. **Never commit `.env`.**

---

## GitHub Copilot Agent Guidance

- **Always** run `npm install` before any build or test command.
- **Always** run `npx tsc --noEmit` to validate types before opening a PR.
- When adding a new page under test, create a corresponding POM in `pages/` before writing the test.
- When generating test IDs, follow the naming convention `data-testid="[component]-[element]"`.
- Prefer updating an existing POM over creating a redundant one.
- Do not modify `playwright.config.ts` unless explicitly asked.
- Add new test files to the appropriate subfolder (`smoke`, `functional`, or `regression`).
- PRs must include: updated tests, updated POM (if applicable), and passing CI.
