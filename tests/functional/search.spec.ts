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

  test('Search: nonsense query shows no-results state', async ({ searchResultsPage }) => {
    await searchResultsPage.gotoWithQuery(testData.search.noResultsQuery);
    // Either 0 article hits or a "no results" message should be present
    const count = await searchResultsPage.getResultCount();
    if (count === 0) {
      await expect(searchResultsPage.noResultsMessage).toBeVisible();
    } else {
      // Some CMSes still show "no results found" text alongside a related-posts block
      expect(count).toBe(0);
    }
  });

  test('Search: navigation bar is present on search results page', async ({ searchResultsPage }) => {
    await searchResultsPage.gotoWithQuery(testData.search.validQuery);
    await expect(searchResultsPage.nav.container).toBeVisible();
  });
});
