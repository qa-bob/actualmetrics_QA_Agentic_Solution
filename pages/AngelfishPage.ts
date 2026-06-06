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

    // h1 lives in the page's header graphic band, not in #main-content
    this.pageHeading = page.locator('#header-graphic-angelfish h1');
    this.pageContent = page.locator('#main-content .entry-content');
  }

  async goto(): Promise<void> {
    await this.page.goto('/angelfish-web-analytics-software/');
  }
}
