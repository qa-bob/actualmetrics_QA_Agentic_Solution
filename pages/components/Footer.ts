import { Page, Locator } from '@playwright/test';

/**
 * Footer component present on every page of actualmetrics.com.
 * Composed into each page object that needs footer interactions/assertions.
 */
export class Footer {
  readonly container: Locator;
  readonly companyDescription: Locator;

  // Products column
  readonly angelfishLink: Locator;
  readonly urchinLink: Locator;
  readonly googleAnalyticsAltLink: Locator;

  // Services column
  readonly consultingLink: Locator;
  readonly keywordManagementLink: Locator;

  // Company column
  readonly aboutContactLink: Locator;

  // Footer bar
  readonly sitemapLink: Locator;
  readonly privacyPolicyLink: Locator;
  readonly copyrightBar: Locator;

  constructor(private readonly page: Page) {
    this.container           = page.locator('#footer');
    this.companyDescription  = page.locator('#footer-company-description');

    const productsMenu = page.locator('#prefooter-menu-left');
    this.angelfishLink          = productsMenu.getByRole('link', { name: 'Angelfish Software' });
    this.urchinLink             = productsMenu.getByRole('link', { name: 'Urchin Software' });
    this.googleAnalyticsAltLink = productsMenu.getByRole('link', { name: 'Google Analytics Alternative' });

    const servicesMenu = page.locator('#prefooter-menu-right');
    this.consultingLink         = servicesMenu.getByRole('link', { name: 'Consulting' });
    this.keywordManagementLink  = servicesMenu.getByRole('link', { name: 'Keyword Management' });

    this.aboutContactLink  = page.locator('#footer-contact').getByRole('link', { name: /About.*Contact/i });
    this.sitemapLink       = page.locator('#footer-menu').getByRole('link', { name: 'Sitemap' });
    this.privacyPolicyLink = page.locator('#footer-menu').getByRole('link', { name: 'Privacy Policy' });
    this.copyrightBar      = page.locator('#footer-bar .left');
  }

  async navigateToPrivacyPolicy(): Promise<void> {
    await this.privacyPolicyLink.click();
  }

  async navigateToSitemap(): Promise<void> {
    await this.sitemapLink.click();
  }

  async getCopyrightText(): Promise<string | null> {
    return this.copyrightBar.textContent();
  }
}
