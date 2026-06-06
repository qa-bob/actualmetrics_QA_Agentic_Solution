---
applyTo: "tests/**/*.spec.ts"
---

# Playwright Test File Instructions

These rules apply to all test files matching `tests/**/*.spec.ts`.

## Structure

- Wrap related tests in a `test.describe('Feature Name', () => { ... })` block.
- Each `test()` block tests **one logical scenario only**.
- Use `test.beforeEach()` for shared navigation (e.g., `await page.goto('/')`) rather than repeating it in every test.
- Use `test.afterEach()` only for cleanup that cannot be handled by Playwright's built-in isolation.

## Naming

- `describe` block label = feature or page name (e.g., `'Homepage'`, `'Contact Form'`).
- `test` title format: `'[Feature]: [expected behaviour] when [condition]'`
  - ✅ `'Navigation: displays active link when user is on the homepage'`
  - ✅ `'Contact Form: shows validation error when email field is empty'`
  - ❌ `'test 1'`, `'check button'`

## Imports & Page Objects

- Import the required POM class from `../../pages/`.
- Instantiate the POM inside `beforeEach` or at the top of `test.describe`.
- Never instantiate `page` directly for interactions — use the POM.

```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Homepage', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('Homepage: renders hero heading', async () => {
    await expect(homePage.heroHeading).toBeVisible();
  });
});
```

## Assertions

- Use Playwright auto-waiting assertions (`toBeVisible`, `toHaveText`, `toHaveURL`, etc.).
- One assertion concept per `test()` block; multiple `expect` calls are fine if they validate the same scenario.
- Never use `waitForTimeout` — replace with proper assertions or `waitForSelector`.

## Test Data & Environment

- Reference `process.env.BASE_URL` (or `baseURL` from config) — never hardcode `http://www.actualmetrics.com`.
- Sensitive values (credentials) come from `process.env` only.
- Static test data (names, emails) lives in `fixtures/data/`.

## Tags & Annotations

- Tag smoke tests: `test('...', { tag: '@smoke' }, async () => { ... })`.
- Skip flaky tests with `test.skip()` and a `// TODO:` comment explaining why.
- Mark known bugs: `test.fixme('...', async () => { ... })`.
