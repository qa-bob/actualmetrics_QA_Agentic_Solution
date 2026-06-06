import { test, expect } from '../../fixtures/index';
import { assertPagePath, assertTitleContains } from '../../utils/testHelpers';

test.describe('Navigation', () => {
  test('Navigation: logo click returns to homepage', async ({ angelfishPage }) => {
    await angelfishPage.nav.clickLogo();
    await expect(angelfishPage.page).toHaveURL(/actualmetrics\.com\/?$/);
  });

  test('Navigation: Angelfish menu link navigates correctly', async ({ homePage, isMobile }) => {
    test.skip(isMobile, 'Nav links are collapsed into a hamburger menu on mobile viewports');
    await homePage.nav.navigateToAngelfish();
    await assertPagePath(homePage.page, 'angelfish-web-analytics-software');
    await assertTitleContains(homePage.page, 'Angelfish');
  });

  test('Navigation: Urchin menu link navigates correctly', async ({ homePage, isMobile }) => {
    test.skip(isMobile, 'Nav links are collapsed into a hamburger menu on mobile viewports');
    await homePage.nav.navigateToUrchIn();
    await assertPagePath(homePage.page, 'urchin-software');
  });

  test('Navigation: Google Analytics Alternative link navigates correctly', async ({ homePage, isMobile }) => {
    test.skip(isMobile, 'Nav links are collapsed into a hamburger menu on mobile viewports');
    await homePage.nav.googleAnalyticsAltLink.click();
    await assertPagePath(homePage.page, 'google-analytics-alternative');
  });

  test('Navigation: Consulting sub-menu link navigates correctly', async ({ homePage, isMobile }) => {
    test.skip(isMobile, 'Sub-menu hover interaction not available on mobile viewports');
    await homePage.nav.navigateToConsulting();
    await assertPagePath(homePage.page, 'services/consulting');
  });

  test('Navigation: About Us sub-menu link navigates correctly', async ({ homePage, isMobile }) => {
    test.skip(isMobile, 'Sub-menu hover interaction not available on mobile viewports');
    await homePage.nav.navigateToAboutUs();
    await assertPagePath(homePage.page, 'company/about-us');
  });

  test('Navigation: search input is visible on every page', async ({ homePage }) => {
    await expect(homePage.nav.searchInput).toBeVisible();
  });

  test('Navigation: footer Privacy Policy link navigates correctly', async ({ homePage }) => {
    await homePage.footer.navigateToPrivacyPolicy();
    await assertPagePath(homePage.page, 'privacy-policy');
  });

  test('Navigation: footer Sitemap link navigates correctly', async ({ homePage }) => {
    await homePage.footer.navigateToSitemap();
    await assertPagePath(homePage.page, 'sitemap');
  });
});
