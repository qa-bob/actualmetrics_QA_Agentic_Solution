import { test, expect } from '../../fixtures/index';
import { assertTitleContains, assertPagePath } from '../../utils/testHelpers';

test.describe('Consulting Page', () => {
  test('Consulting: page title contains consulting-related text', async ({ consultingPage }) => {
    await assertTitleContains(consultingPage.page, 'Consulting');
  });

  test('Consulting: URL is correct', async ({ consultingPage }) => {
    await assertPagePath(consultingPage.page, 'services/consulting');
  });

  test('Consulting: page heading is visible', async ({ consultingPage }) => {
    await expect(consultingPage.pageHeading).toBeVisible();
  });

  test('Consulting: main content area renders', async ({ consultingPage }) => {
    await expect(consultingPage.pageContent).toBeVisible();
  });

  test('Consulting: navigation bar is present', async ({ consultingPage }) => {
    await expect(consultingPage.nav.container).toBeVisible();
  });

  test('Consulting: footer Services links are present', async ({ consultingPage }) => {
    await expect(consultingPage.footer.consultingLink).toBeVisible();
    await expect(consultingPage.footer.keywordManagementLink).toBeVisible();
  });
});
