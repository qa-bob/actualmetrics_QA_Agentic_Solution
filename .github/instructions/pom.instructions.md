---
applyTo: "pages/**/*.ts"
---

# Page Object Model (POM) Instructions

These rules apply to all files matching `pages/**/*.ts`.

## Class Structure

Every POM must follow this structure (in order):

1. **Imports** — Playwright `Page` type and any parent class.
2. **Class declaration** — extends `BasePage` (or base component class).
3. **`readonly` locator properties** — declared at the top of the class body.
4. **Constructor** — calls `super(page)` only; no logic.
5. **Navigation method** — `async goto(): Promise<void>` if the page has a direct URL.
6. **Interaction methods** — one method per user action.
7. **Getter methods** — return locators or text for use in test assertions.

```typescript
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
  readonly nameInput    = this.page.getByLabel('Name');
  readonly emailInput   = this.page.getByLabel('Email');
  readonly messageInput = this.page.getByLabel('Message');
  readonly submitButton = this.page.getByRole('button', { name: 'Send' });
  readonly successBanner = this.page.getByRole('alert');

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/contact');
  }

  async fillForm(name: string, email: string, message: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.messageInput.fill(message);
  }

  async submitForm(): Promise<void> {
    await this.submitButton.click();
  }
}
```

## Locator Strategy (priority order)

1. `getByRole()` — semantic, accessible, most resilient.
2. `getByLabel()` — for form fields.
3. `getByPlaceholder()` — fallback for unlabelled inputs.
4. `getByTestId()` — when a `data-testid` attribute exists.
5. `getByText()` — for non-interactive text elements.
6. CSS selector — last resort only; document why with a comment.
7. **Never use XPath.**

## Naming Conventions

- Class names: `PascalCase` matching the page name — `HomePage`, `ProductDetailPage`.
- File names: match the class name — `HomePage.ts`, `ProductDetailPage.ts`.
- Locator properties: `camelCase`, noun form — `loginButton`, `emailInput`, `errorMessage`.
- Method names: `camelCase`, verb-noun form — `clickLoginButton()`, `fillEmailField()`, `getErrorMessage()`.

## OOP Rules

- All POMs **must extend `BasePage`** (or a shared component class for reusable components).
- Use **inheritance** for shared behaviour (e.g., `AuthenticatedPage extends BasePage` for pages behind login).
- Use **composition** for reusable UI components (e.g., `NavigationBar`, `Footer`) — instantiate them as class properties.
- Keep methods **small and single-purpose** — if a method exceeds ~10 lines, decompose it.
- No assertions inside POM methods — return values or locators for test files to assert against.

## BasePage Contract

`BasePage` must expose at minimum:

```typescript
export abstract class BasePage {
  constructor(protected readonly page: Page) {}
  abstract goto(): Promise<void>;
}
```

## What Does NOT Belong in a POM

- `expect()` assertions — these belong in test files.
- Hardcoded `waitForTimeout` calls.
- Test data (move to `fixtures/data/`).
- Business logic unrelated to UI interaction.
