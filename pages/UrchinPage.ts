import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationBar } from './components/NavigationBar';
import { Footer } from './components/Footer';

export class UrchinPage extends BasePage {
  readonly nav: NavigationBar;
  readonly footer: Footer;

  readonly pageHeading: Locator;
  readonly pageContent: Locator;

  constructor(page: Page) {
    super(page);
    this.nav    = new NavigationBar(page);
    this.footer = new Footer(page);

    this.pageHeading = page.locator('#main-content').getByRole('heading').first();
    this.pageContent = page.locator('#main-content .entry-content');
  }

  async goto(): Promise<void> {
    await this.page.goto('/urchin-software/');
  }
}
