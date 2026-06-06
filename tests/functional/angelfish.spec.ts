import { test, expect } from '../../fixtures/index';
import { assertTitleContains, assertPagePath } from '../../utils/testHelpers';

test.describe('Angelfish Page', () => {
  test('Angelfish: page title contains "Angelfish"', async ({ angelfishPage }) => {
    await assertTitleContains(angelfishPage.page, 'Angelfish');
  });

  test('Angelfish: URL is correct', async ({ angelfishPage }) => {
    await assertPagePath(angelfishPage.page, 'angelfish-web-analytics-software');
  });

  test('Angelfish: page heading is visible', async ({ angelfishPage }) => {
    await expect(angelfishPage.pageHeading).toBeVisible();
  });

  test('Angelfish: main content area renders', async ({ angelfishPage }) => {
    await expect(angelfishPage.pageContent).toBeVisible();
  });

  test('Angelfish: navigation bar is present', async ({ angelfishPage }) => {
    await expect(angelfishPage.nav.container).toBeVisible();
    await expect(angelfishPage.nav.logoImage).toBeVisible();
  });

  test('Angelfish: footer is present', async ({ angelfishPage }) => {
    await expect(angelfishPage.footer.container).toBeVisible();
  });

  test('Angelfish: footer contains Angelfish product link', async ({ angelfishPage }) => {
    await expect(angelfishPage.footer.angelfishLink).toBeVisible();
  });
});
