import { test, expect } from '../../fixtures/index';
import { assertPagePath } from '../../utils/testHelpers';
import testData from '../../fixtures/data/testData.json';

test.describe('Search', () => {
  test('Search: submitting a query via search bar updates the URL', async ({ homePage }) => {
    await homePage.nav.search(testData.search.validQuery);
    await expect(homePage.page).toHaveURL(/\?s=/);
  });

  test('Search: valid query returns results', async ({ searchResultsPage }) => {
    await searchResultsPage.gotoWithQuery(testData.search.validQuery);
    await assertPagePath(searchResultsPage.page, `?s=${testData.search.validQuery}`);
    const count = await searchResultsPage.getResultCount();
    expect(count).toBeGreaterThan(0);
  });

  test('Search: nonsense query loads a search results page without crashing', async ({ searchResultsPage }) => {
    await searchResultsPage.gotoWithQuery(testData.search.noResultsQuery);
    // The page should load and the nav must be present regardless of result count
    await expect(searchResultsPage.nav.container).toBeVisible();
    // Either zero results are shown with a message, or WordPress shows its default content
    const count = await searchResultsPage.getResultCount();
    if (count === 0) {
      await expect(searchResultsPage.noResultsMessage).toBeVisible();
    }
    // count > 0 is acceptable — WordPress can return unrelated posts for any query
  });

  test('Search: navigation bar is present on search results page', async ({ searchResultsPage }) => {
    await searchResultsPage.gotoWithQuery(testData.search.validQuery);
    await expect(searchResultsPage.nav.container).toBeVisible();
  });
});
