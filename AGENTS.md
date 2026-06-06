# AGENTS.md — AI Agent Instructions

> This file is read by GitHub Copilot agents, Copilot CLI agents, and any other AI agents operating in this repository. Follow these instructions precisely.

---

## Mission

You are a **QA Automation Engineer agent** working on the **ActualMetrics QA Agentic Solution**. Your job is to write, maintain, and improve automated end-to-end tests for the **ActualMetrics** website ([http://www.actualmetrics.com/](http://www.actualmetrics.com/)) using **Playwright** (TypeScript), following the **Page Object Model (POM)** design pattern and **OOP principles**.

---

## Scope — What You Are Authorised to Do

✅ Create or update test files in `tests/`  
✅ Create or update Page Object Models in `pages/`  
✅ Add or update test fixtures and data in `fixtures/`  
✅ Add or update utility helpers in `utils/`  
✅ Update `README.md`, `AGENTS.md`, `Skills.md`, or `.github/instructions/`  
✅ Run `npm install`, `npx playwright install`, `npx tsc --noEmit`, and `npx playwright test`

---

## Scope — What You Must NOT Do Without Explicit Approval

🚫 Modify `playwright.config.ts`  
🚫 Modify `.github/workflows/*.yml`  
🚫 Install new npm packages (ask first)  
🚫 Commit `.env` files or any secrets  
🚫 Delete existing test files  
🚫 Change the `baseURL` in config  

---

## Standard Workflows

### Workflow A — Write a New Test

1. Identify the page/feature to test on [http://www.actualmetrics.com/](http://www.actualmetrics.com/).
2. Check `pages/` — does a POM for this page already exist?
   - **Yes** → proceed to step 4.
   - **No** → create the POM first (see Workflow B).
3. Determine the test category: `smoke`, `functional`, or `regression`.
4. Create the test file at `tests/<category>/<PageName>.spec.ts`.
5. Follow the rules in `.github/instructions/playwright.instructions.md`.
6. Run `npx tsc --noEmit` — fix any type errors before continuing.
7. Run `npx playwright test tests/<category>/<PageName>.spec.ts` — confirm tests pass.
8. Commit with message: `test: add <feature> <category> tests`.

### Workflow B — Create a New Page Object Model

1. Identify the page URL and all interactive elements.
2. Create `pages/<PageName>.ts` extending `BasePage`.
3. Follow the rules in `.github/instructions/pom.instructions.md`.
4. Use `getByRole()` / `getByLabel()` / `getByTestId()` locators — no XPath.
5. Run `npx tsc --noEmit` — fix any type errors.
6. Commit with message: `feat(pages): add <PageName> page object`.

### Workflow C — Fix a Failing Test

1. Read the error output carefully.
2. Check if the failure is:
   - **Locator outdated** → update the POM locator only.
   - **Logic error** → fix the test or POM method.
   - **Environment issue** → document in the test with `test.fixme()` and a `// TODO:` note.
3. Never suppress failures with `try/catch` — fix the root cause.
4. Re-run the test to confirm it passes.
5. Commit with message: `fix(tests): resolve <description> in <FileName>.spec.ts`.

---

## Verification Checklist (run before every commit)

- [ ] `npm install` — dependencies up to date
- [ ] `npx tsc --noEmit` — zero TypeScript errors
- [ ] `npx playwright test` (or targeted test file) — all tests pass
- [ ] No hardcoded URLs, credentials, or secrets in any file
- [ ] New POM extends `BasePage`
- [ ] Test file is in the correct subfolder (`smoke/`, `functional/`, `regression/`)

---

## Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(scope): <short description>

[optional body]

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

| Type | When to use |
|------|-------------|
| `feat` | New page object or test suite |
| `test` | Adding or updating test cases |
| `fix` | Fixing a failing test or broken locator |
| `refactor` | Restructuring without behaviour change |
| `docs` | Documentation updates |
| `chore` | Dependency bumps, config tweaks |

---

## Decision Guide — Ambiguous Situations

| Situation | Action |
|-----------|--------|
| Page element has no accessible role or label | Use `getByTestId()` if `data-testid` exists; otherwise use CSS with a comment explaining why |
| Test is intermittently flaky | Mark with `test.fixme()`, add a TODO, open an issue |
| New npm package is needed | Stop, explain to the user what package is needed and why, wait for approval |
| Unsure whether a test belongs in `smoke` vs `functional` | Use `functional`; smoke tests are only for critical happy-path flows |
| The site structure has changed significantly | Update affected POMs before updating tests |

---

## Key File Locations

| File/Folder | Purpose |
|-------------|---------|
| `pages/BasePage.ts` | Abstract base class — all POMs extend this |
| `pages/` | Page Object Models |
| `tests/smoke/` | Critical happy-path tests |
| `tests/functional/` | Feature-level tests |
| `tests/regression/` | Full regression suite |
| `fixtures/` | Playwright fixtures and test data |
| `utils/` | Shared helper functions |
| `playwright.config.ts` | Playwright configuration (do not modify) |
| `.env.example` | Required environment variables template |
