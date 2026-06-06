import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationBar } from './components/NavigationBar';
import { Footer } from './components/Footer';

export class HomePage extends BasePage {
  readonly nav: NavigationBar;
  readonly footer: Footer;

  readonly tagline: Locator;
  readonly heroHeading: Locator;

  // Product cards
  readonly angelfishSection: Locator;
  readonly angelfishHeading: Locator;
  readonly angelfishDescription: Locator;
  readonly angelfishLearnMoreLink: Locator;

  readonly urchinSection: Locator;
  readonly urchinHeading: Locator;
  readonly urchinDescription: Locator;
  readonly urchinLearnMoreLink: Locator;

  constructor(page: Page) {
    super(page);
    this.nav    = new NavigationBar(page);
    this.footer = new Footer(page);

    this.tagline     = page.locator('#tagline h3');
    this.heroHeading = page.locator('#header-graphic-home h1').first();

    this.angelfishSection      = page.locator('#home-angelfish');
    this.angelfishHeading      = page.locator('#home-angelfish h2');
    this.angelfishDescription  = page.locator('#home-angelfish p').first();
    this.angelfishLearnMoreLink = page.locator('#home-angelfish').getByRole('link', { name: 'Learn More' });

    this.urchinSection      = page.locator('#home-urchin');
    this.urchinHeading      = page.locator('#home-urchin h2');
    this.urchinDescription  = page.locator('#home-urchin p').first();
    this.urchinLearnMoreLink = page.locator('#home-urchin').getByRole('link', { name: 'Learn More' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async clickAngelfishLearnMore(): Promise<void> {
    await this.angelfishLearnMoreLink.click();
  }

  async clickUrchinLearnMore(): Promise<void> {
    await this.urchinLearnMoreLink.click();
  }

  async getTaglineText(): Promise<string | null> {
    return this.tagline.textContent();
  }
}
