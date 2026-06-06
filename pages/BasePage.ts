import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(readonly page: Page) {}

  abstract goto(): Promise<void>;

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async getPageURL(): Promise<string> {
    return this.page.url();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }
}
