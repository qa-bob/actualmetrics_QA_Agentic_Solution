import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationBar } from './components/NavigationBar';
import { Footer } from './components/Footer';

export class SearchResultsPage extends BasePage {
  readonly nav: NavigationBar;
  readonly footer: Footer;

  readonly pageHeading: Locator;
  readonly resultItems: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.nav    = new NavigationBar(page);
    this.footer = new Footer(page);

    this.pageHeading      = page.locator('#main-content').getByRole('heading').first();
    // WordPress search results list each hit as an article
    this.resultItems      = page.locator('#main-content article');
    this.noResultsMessage = page.locator('#main-content').getByText(/no results/i);
  }

  async goto(): Promise<void> {
    await this.page.goto('/?s=');
  }

  async gotoWithQuery(query: string): Promise<void> {
    await this.page.goto(`/?s=${encodeURIComponent(query)}`);
  }

  async getResultCount(): Promise<number> {
    return this.resultItems.count();
  }
}
