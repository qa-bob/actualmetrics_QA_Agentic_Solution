# ActualMetrics — QA Agentic Solution

> AI-assisted, automated end-to-end test framework for **[ActualMetrics](http://www.actualmetrics.com/)**, built with Playwright + TypeScript, powered by GitHub Copilot.

[![Playwright Tests](https://github.com/qa-bob/actualmetrics_QA_Agentic_Solution/actions/workflows/playwright.yml/badge.svg)](https://github.com/qa-bob/actualmetrics_QA_Agentic_Solution/actions/workflows/playwright.yml)

---

## 📋 Purpose

This repository delivers an end-to-end QA automation solution for the [ActualMetrics](http://www.actualmetrics.com/) website. It is built and maintained using:

- **GitHub Copilot** (AI-assisted test generation and code review)
- **Playwright** (browser automation framework)
- **TypeScript** (type-safe test code)
- **Page Object Model (POM)** design pattern
- **OOP principles** (encapsulation, inheritance, single responsibility)
- **GitHub Actions** CI/CD pipeline

The solution is developed as part of the **ActualMetrics Phoenix Startup QA Agentic Solutions** initiative, demonstrating how AI agents can accelerate QA engineering workflows.

---

## 🏢 About ActualMetrics

| Field | Details |
|-------|---------|
| **Company** | ActualMetrics |
| **Description** | Website performance measurement software |
| **Website** | [http://www.actualmetrics.com/](http://www.actualmetrics.com/) |
| **LinkedIn** | [View Profile](https://www.linkedin.com/company/actual-metrics/) |
| **City** | Scottsdale, AZ |
| **Founded** | 2006 |
| **Leader** | Mike Chipman (Founder) |

---

## 🧪 Test Coverage

| Suite | Location | Purpose |
|-------|----------|---------|
| Smoke | `tests/smoke/` | Critical happy-path flows — runs on every PR |
| Functional | `tests/functional/` | Feature-level validation |
| Regression | `tests/regression/` | Full regression suite |

---

## 📁 Project Structure

```
actualmetrics_QA_Agentic_Solution/
├── .github/
│   ├── copilot-instructions.md      # Copilot coding standards & build guide
│   ├── instructions/
│   │   ├── playwright.instructions.md  # Rules for test files
│   │   └── pom.instructions.md         # Rules for page objects
│   ├── workflows/
│   │   └── playwright.yml           # CI pipeline
│   └── README.md                    # Guide to the .github folder
├── pages/                           # Page Object Models (POM)
│   └── BasePage.ts                  # Abstract base class
├── tests/
│   ├── smoke/                       # Critical happy-path tests
│   ├── functional/                  # Feature tests
│   └── regression/                  # Full regression suite
├── fixtures/                        # Playwright fixtures & test data
│   └── data/                        # JSON/CSV test data files
├── utils/                           # Shared helper functions
├── AGENTS.md                        # AI agent workflows & rules
├── Skills.md                        # Copilot skill definitions
├── playwright.config.ts
├── package.json
├── .env.example                     # Required env vars template
└── README.md                        # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher — [download](https://nodejs.org/)
- **npm** 9+ (included with Node.js)
- A GitHub account with GitHub Copilot access (for AI-assisted development)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/qa-bob/actualmetrics_QA_Agentic_Solution.git
cd actualmetrics_QA_Agentic_Solution

# 2. Install Node dependencies
npm install

# 3. Install Playwright browsers
npx playwright install --with-deps

# 4. Set up environment variables
cp .env.example .env
# Edit .env with your local values (see Environment Variables section below)
```

### Running Tests

```bash
# Run all tests (headless)
npx playwright test

# Run only smoke tests
npx playwright test tests/smoke/

# Run a single test file
npx playwright test tests/smoke/homepage.spec.ts

# Run with interactive UI
npx playwright test --ui

# Run with headed browser (visible)
npx playwright test --headed

# View the HTML test report
npx playwright show-report

# TypeScript type check (no compile output)
npx tsc --noEmit
```

---

## 🔐 Environment Variables

Copy `.env.example` to `.env` and fill in the values. **Never commit `.env`.**

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `BASE_URL` | No | `http://www.actualmetrics.com` | Target site URL |
| `TEST_USERNAME` | For auth tests | — | Login username |
| `TEST_PASSWORD` | For auth tests | — | Login password |

For CI, set these as **GitHub Actions Secrets** in the repository settings.

---

## 🤝 Contributor Rules

### Before You Start

1. Read `.github/copilot-instructions.md` — it defines the coding standards every contributor (human and AI) must follow.
2. Read `AGENTS.md` — it documents the standard workflows for common tasks.
3. Ensure your local environment passes `npx tsc --noEmit` and `npx playwright test` before making changes.

### Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready — protected, requires PR + passing CI |
| `develop` | Integration branch — all feature branches merge here |
| `feat/<short-description>` | New page objects or test suites |
| `fix/<short-description>` | Fixes for failing tests or broken locators |
| `chore/<short-description>` | Dependency updates, config changes |

### Pull Request Rules

- Every PR **must** pass CI (type-check + Playwright tests).
- PR title must follow [Conventional Commits](https://www.conventionalcommits.org/) format.
- PR description must include: **what changed**, **why**, and **how to test it**.
- At least one human reviewer required for merges to `main`.
- Copilot code review runs automatically — address all flagged issues before requesting human review.

### Code Standards (summary)

| Rule | Detail |
|------|--------|
| Language | TypeScript only — no `any` |
| Pattern | Page Object Model — all UI interactions via POMs |
| Assertions | In test files only — never inside POMs |
| Locators | `getByRole()` → `getByLabel()` → `getByTestId()` → CSS (no XPath) |
| Secrets | `process.env` only — never hardcoded |
| Wait strategy | Auto-waiting assertions — never `waitForTimeout` |
| Naming | `PascalCase` classes, `camelCase` methods/properties, `kebab-case` files |

Full rules: see `.github/copilot-instructions.md`, `.github/instructions/playwright.instructions.md`, and `.github/instructions/pom.instructions.md`.

### Commit Message Format

```
<type>(scope): <short description>

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

Types: `feat`, `test`, `fix`, `refactor`, `docs`, `chore`

### Using GitHub Copilot

This repo is fully configured for GitHub Copilot. To accelerate your work:

- **Chat / inline suggestions** — use with the context of `.github/copilot-instructions.md` already loaded.
- **Copilot CLI** — run `/skills` to see available skills (scaffold pages, generate tests, fix failures).
- **Copilot Agents** — see `AGENTS.md` for delegatable workflows.
- **Copilot Code Review** — automatically triggered on PRs using repository instructions.

---

## 📚 Key Documentation

| Document | Purpose |
|----------|---------|
| [`AGENTS.md`](./AGENTS.md) | AI agent workflows, scope, and decision guide |
| [`Skills.md`](./Skills.md) | Copilot skill definitions and usage examples |
| [`.github/README.md`](./.github/README.md) | Guide to the `.github` folder structure |
| [`.github/copilot-instructions.md`](./.github/copilot-instructions.md) | Copilot coding standards |

---

*Part of the ActualMetrics Phoenix Startup QA Agentic Solutions project.*
