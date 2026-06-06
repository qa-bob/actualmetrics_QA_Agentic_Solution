import { test, expect } from '../../fixtures/index';
import { assertTitleContains } from '../../utils/testHelpers';

test.describe('Homepage', () => {
  test('Homepage: page title contains "Actual Metrics"', async ({ homePage }) => {
    await assertTitleContains(homePage.page, 'Actual Metrics');
  });

  test('Homepage: tagline reads "We Specialize in Website Performance Measurement"', async ({ homePage }) => {
    await expect(homePage.tagline).toHaveText('We Specialize in Website Performance Measurement');
  });

  test('Homepage: logo image is visible', async ({ homePage }) => {
    await expect(homePage.nav.logoImage).toBeVisible();
  });

  test('Homepage: Angelfish product section is visible', async ({ homePage }) => {
    await expect(homePage.angelfishSection).toBeVisible();
    await expect(homePage.angelfishHeading).toHaveText('Angelfish Software');
  });

  test('Homepage: Urchin product section is visible', async ({ homePage }) => {
    await expect(homePage.urchinSection).toBeVisible();
    await expect(homePage.urchinHeading).toHaveText('Urchin Software');
  });

  test('Homepage: Angelfish "Learn More" link navigates to the Angelfish page', async ({ homePage }) => {
    await homePage.clickAngelfishLearnMore();
    await expect(homePage.page).toHaveURL(/angelfish-web-analytics-software/);
  });

  test('Homepage: Urchin "Learn More" link navigates to the Urchin page', async ({ homePage }) => {
    await homePage.clickUrchinLearnMore();
    await expect(homePage.page).toHaveURL(/urchin-software/);
  });

  test('Homepage: footer is visible and contains company description', async ({ homePage }) => {
    await expect(homePage.footer.container).toBeVisible();
    await expect(homePage.footer.companyDescription).toBeVisible();
  });

  test('Homepage: copyright text is present in the footer bar', async ({ homePage }) => {
    const copyright = await homePage.footer.getCopyrightText();
    expect(copyright).toMatch(/Copyright.*Actual Metrics/i);
  });
});
