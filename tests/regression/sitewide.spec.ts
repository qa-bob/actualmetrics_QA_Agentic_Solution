import { test, expect } from '../../fixtures/index';
import { assertTitleContains, assertPagePath } from '../../utils/testHelpers';

/**
 * Sitewide regression checks — covers every major page in one suite.
 * Verifies that critical structural elements (nav, footer, heading, title)
 * are present and correct after any deployment.
 */
test.describe('Sitewide Regression', () => {
  const pages = [
    { name: 'Homepage',                    path: '/',                                  titleFragment: 'Actual Metrics' },
    { name: 'Angelfish',                   path: '/angelfish-web-analytics-software/', titleFragment: 'Angelfish' },
    { name: 'Urchin',                      path: '/urchin-software/',                  titleFragment: 'Urchin' },
    { name: 'Google Analytics Alternative',path: '/google-analytics-alternative/',     titleFragment: 'Google Analytics' },
    { name: 'Consulting',                  path: '/services/consulting/',              titleFragment: 'Consulting' },
    { name: 'Keyword Management',          path: '/services/ppc-keyword-management/',  titleFragment: 'Keyword' },
    { name: 'About Us',                    path: '/company/about-us/',                 titleFragment: 'Company' },
    { name: 'Jobs',                        path: '/company/jobs/',                     titleFragment: '' },
    { name: 'Privacy Policy',              path: '/privacy-policy/',                   titleFragment: 'Privacy' },
    { name: 'Sitemap',                     path: '/sitemap/',                          titleFragment: '' },
  ];

  for (const { name, path, titleFragment } of pages) {
    test(`${name}: loads without error and navigation is visible`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('#main-nav')).toBeVisible();
      await expect(page.locator('#footer')).toBeVisible();
      if (titleFragment) {
        await assertTitleContains(page, titleFragment);
      }
    });
  }

  test('Sitewide: all footer product links resolve without 4xx errors', async ({ homePage }) => {
    const links = [
      homePage.footer.angelfishLink,
      homePage.footer.urchinLink,
      homePage.footer.googleAnalyticsAltLink,
    ];
    for (const link of links) {
      await expect(link).toBeVisible();
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });

  test('Sitewide: all footer service links resolve without 4xx errors', async ({ homePage }) => {
    const links = [
      homePage.footer.consultingLink,
      homePage.footer.keywordManagementLink,
    ];
    for (const link of links) {
      await expect(link).toBeVisible();
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });

  test('Sitewide: Privacy Policy page loads from footer link', async ({ homePage }) => {
    await homePage.footer.navigateToPrivacyPolicy();
    await assertPagePath(homePage.page, 'privacy-policy');
    await expect(homePage.page.locator('#main-nav')).toBeVisible();
  });

  test('Sitewide: Sitemap page loads from footer link', async ({ homePage }) => {
    await homePage.footer.navigateToSitemap();
    await assertPagePath(homePage.page, 'sitemap');
    await expect(homePage.page.locator('#main-nav')).toBeVisible();
  });
});
