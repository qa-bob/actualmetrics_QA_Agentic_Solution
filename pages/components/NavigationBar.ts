import { Page, Locator } from '@playwright/test';

/**
 * Shared navigation bar present on every page of actualmetrics.com.
 * Composed into each page object that needs navigation interactions.
 */
export class NavigationBar {
  readonly container: Locator;
  readonly logo: Locator;
  readonly logoImage: Locator;
  readonly searchInput: Locator;

  // Top-level menu links
  readonly angelfishLink: Locator;
  readonly urchinLink: Locator;
  readonly googleAnalyticsAltLink: Locator;
  readonly servicesMenuLink: Locator;
  readonly companyMenuLink: Locator;

  // Dropdown sub-menu links
  readonly consultingLink: Locator;
  readonly keywordManagementLink: Locator;
  readonly aboutUsLink: Locator;
  readonly jobsLink: Locator;

  constructor(private readonly page: Page) {
    this.container  = page.locator('#main-nav');
    this.logo       = page.locator('#logo a.logo-img');
    // img[alt] is the most resilient locator for a branding image
    this.logoImage  = page.locator('#logo img[alt="Actual Metrics"]');
    this.searchInput = page.locator('input[name="s"]');

    const menu = page.locator('#main-menu');
    this.angelfishLink           = menu.getByRole('link', { name: 'Angelfish', exact: true });
    this.urchinLink              = menu.getByRole('link', { name: 'Urchin', exact: true });
    this.googleAnalyticsAltLink  = menu.getByRole('link', { name: 'Google Analytics Alternative' });
    this.servicesMenuLink        = menu.getByRole('link', { name: 'Services', exact: true });
    this.companyMenuLink         = menu.getByRole('link', { name: 'Company', exact: true });
    this.consultingLink          = menu.getByRole('link', { name: 'Consulting', exact: true });
    this.keywordManagementLink   = menu.getByRole('link', { name: 'Keyword Management' });
    this.aboutUsLink             = menu.getByRole('link', { name: 'About Us' });
    this.jobsLink                = menu.getByRole('link', { name: 'Jobs' });
  }

  async clickLogo(): Promise<void> {
    await this.logo.click();
  }

  async navigateToAngelfish(): Promise<void> {
    await this.angelfishLink.click();
  }

  async navigateToUrchIn(): Promise<void> {
    await this.urchinLink.click();
  }

  async navigateToConsulting(): Promise<void> {
    await this.servicesMenuLink.hover();
    await this.consultingLink.click();
  }

  async navigateToAboutUs(): Promise<void> {
    await this.companyMenuLink.hover();
    await this.aboutUsLink.click();
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }
}
