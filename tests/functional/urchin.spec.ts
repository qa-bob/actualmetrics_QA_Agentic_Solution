import { test, expect } from '../../fixtures/index';
import { assertTitleContains, assertPagePath } from '../../utils/testHelpers';

test.describe('Urchin Page', () => {
  test('Urchin: page title contains "Urchin"', async ({ urchinPage }) => {
    await assertTitleContains(urchinPage.page, 'Urchin');
  });

  test('Urchin: URL is correct', async ({ urchinPage }) => {
    await assertPagePath(urchinPage.page, 'urchin-software');
  });

  test('Urchin: page heading is visible', async ({ urchinPage }) => {
    await expect(urchinPage.pageHeading).toBeVisible();
  });

  test('Urchin: main content area renders', async ({ urchinPage }) => {
    await expect(urchinPage.pageContent).toBeVisible();
  });

  test('Urchin: navigation bar is present', async ({ urchinPage }) => {
    await expect(urchinPage.nav.container).toBeVisible();
    await expect(urchinPage.nav.logoImage).toBeVisible();
  });

  test('Urchin: footer is present', async ({ urchinPage }) => {
    await expect(urchinPage.footer.container).toBeVisible();
  });

  test('Urchin: footer contains Urchin product link', async ({ urchinPage }) => {
    await expect(urchinPage.footer.urchinLink).toBeVisible();
  });
});
