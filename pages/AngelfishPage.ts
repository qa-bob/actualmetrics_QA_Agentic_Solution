import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationBar } from './components/NavigationBar';
import { Footer } from './components/Footer';

export class AngelfishPage extends BasePage {
  readonly nav: NavigationBar;
  readonly footer: Footer;

  readonly pageHeading: Locator;
  readonly pageContent: Locator;

  constructor(page: Page) {
    super(page);
    this.nav    = new NavigationBar(page);
    this.footer = new Footer(page);

    // The h1/h2 heading on the Angelfish product page
    this.pageHeading = page.locator('#main-content').getByRole('heading').first();
    this.pageContent = page.locator('#main-content .entry-content');
  }

  async goto(): Promise<void> {
    await this.page.goto('/angelfish-web-analytics-software/');
  }
}
