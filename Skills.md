# Skills.md — Copilot Skills Reference

> This file documents the custom skills available to GitHub Copilot CLI and agents working in this repository. Skills are invoked with `/skills` in the Copilot CLI.

---

## What Are Skills?

Skills are reusable, named capabilities that extend what Copilot can do in a single command. Instead of describing a multi-step task every time, you invoke a named skill with any required parameters and Copilot executes the full workflow.

Manage skills with the `/skills` command in the Copilot CLI.

---

## Available Skills

### 1. `scaffold-page-object`

**Purpose:** Generate a new Page Object Model (POM) class for a given page on the ActualMetrics website.

**When to use:** When you need to add test coverage for a page that does not yet have a POM in `pages/`.

**Inputs:**
| Parameter | Description | Example |
|-----------|-------------|---------|
| `pageName` | PascalCase class name | `ContactPage` |
| `url` | Relative path of the page | `/contact` |
| `elements` | Key interactive elements to include | `name input, email input, submit button` |

**What it does:**
1. Creates `pages/<PageName>.ts` extending `BasePage`.
2. Declares `readonly` locators using `getByRole()` / `getByLabel()` priority order.
3. Implements `goto()`, interaction methods, and getter methods.
4. Runs `npx tsc --noEmit` to validate types.

**Example invocation:**
```
/skills scaffold-page-object pageName=ContactPage url=/contact elements="name input, email input, message textarea, submit button"
```

---

### 2. `scaffold-test-suite`

**Purpose:** Generate a Playwright test file for an existing Page Object Model.

**When to use:** When a POM exists but no tests have been written for it yet.

**Inputs:**
| Parameter | Description | Example |
|-----------|-------------|---------|
| `pageName` | PascalCase POM class name | `HomePage` |
| `category` | Test category | `smoke`, `functional`, or `regression` |
| `scenarios` | Comma-separated test scenario descriptions | `hero heading visible, nav links work` |

**What it does:**
1. Creates `tests/<category>/<PageName>.spec.ts`.
2. Imports the specified POM.
3. Generates `test.describe()` block with individual `test()` cases per scenario.
4. Follows naming conventions from `.github/instructions/playwright.instructions.md`.
5. Runs `npx tsc --noEmit` then executes the new test file.

**Example invocation:**
```
/skills scaffold-test-suite pageName=HomePage category=smoke scenarios="hero heading is visible, navigation renders correctly, CTA button is clickable"
```

---

### 3. `fix-failing-tests`

**Purpose:** Diagnose and fix failing Playwright tests.

**When to use:** When `npx playwright test` reports failures and you want Copilot to investigate and fix them.

**Inputs:**
| Parameter | Description | Example |
|-----------|-------------|---------|
| `testFile` | (Optional) Path to specific failing test | `tests/smoke/homepage.spec.ts` |

**What it does:**
1. Runs `npx playwright test [testFile]` and captures error output.
2. Identifies root cause: outdated locator, logic error, or environment issue.
3. Updates the relevant POM locator or test logic.
4. Re-runs the test to confirm the fix.
5. Commits with `fix(tests): ...` message.

**Example invocation:**
```
/skills fix-failing-tests testFile=tests/functional/contact.spec.ts
```

---

### 4. `audit-pom`

**Purpose:** Review all files in `pages/` for compliance with the POM rules in `.github/instructions/pom.instructions.md`.

**When to use:** Before a release or when onboarding new contributors to ensure code quality.

**Inputs:** None required.

**What it does:**
1. Reads every `.ts` file in `pages/`.
2. Checks each class for: `BasePage` extension, `readonly` locators, correct locator strategy priority, no assertions, no hardcoded URLs.
3. Reports violations with file + line references.
4. Optionally auto-fixes simple violations (missing `readonly`, wrong locator type).

**Example invocation:**
```
/skills audit-pom
```

---

### 5. `generate-test-data`

**Purpose:** Generate realistic test data for form interactions and fixtures.

**When to use:** When writing tests that require form inputs, user profiles, or structured test data.

**Inputs:**
| Parameter | Description | Example |
|-----------|-------------|---------|
| `type` | Data type to generate | `user`, `contact-form`, `address` |
| `count` | Number of records | `5` |
| `output` | Output file path | `fixtures/data/users.json` |

**What it does:**
1. Generates realistic (non-sensitive) test data records.
2. Writes them to the specified file in `fixtures/data/`.
3. Never generates real PII — uses clearly fake values (e.g., `Test User`, `test@example.com`).

**Example invocation:**
```
/skills generate-test-data type=contact-form count=3 output=fixtures/data/contact-forms.json
```

---

## Adding a New Skill

To register a new skill:
1. Document it in this file following the template above.
2. If implementing as a Copilot CLI skill, configure it via `/skills` → **Add skill**.
3. Reference the new skill in `AGENTS.md` if agents should use it.

---

## Skill Usage Tips

- Skills work best when the relevant POM or test file already exists — they are accelerators, not replacements for understanding the codebase.
- Run `/skills` in the Copilot CLI to see all currently loaded skills.
- If a skill fails, fall back to the manual workflow documented in `AGENTS.md`.
