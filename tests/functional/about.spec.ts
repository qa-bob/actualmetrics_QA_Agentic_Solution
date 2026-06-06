import { test, expect } from '../../fixtures/index';
import { assertTitleContains, assertPagePath } from '../../utils/testHelpers';

test.describe('About Us Page', () => {
  test('About Us: URL is correct', async ({ aboutUsPage }) => {
    await assertPagePath(aboutUsPage.page, 'company/about-us');
  });

  test('About Us: page title contains company-related text', async ({ aboutUsPage }) => {
    await assertTitleContains(aboutUsPage.page, 'Company');
  });

  test('About Us: page heading is visible', async ({ aboutUsPage }) => {
    await expect(aboutUsPage.pageHeading).toBeVisible();
  });

  test('About Us: main content area renders', async ({ aboutUsPage }) => {
    await expect(aboutUsPage.pageContent).toBeVisible();
  });

  test('About Us: navigation bar is present', async ({ aboutUsPage }) => {
    await expect(aboutUsPage.nav.container).toBeVisible();
    await expect(aboutUsPage.nav.logoImage).toBeVisible();
  });

  test('About Us: footer About/Contact link is present', async ({ aboutUsPage }) => {
    await expect(aboutUsPage.footer.aboutContactLink).toBeVisible();
  });
});
