import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AngelfishPage } from '../pages/AngelfishPage';
import { UrchinPage } from '../pages/UrchinPage';
import { ConsultingPage } from '../pages/ConsultingPage';
import { AboutUsPage } from '../pages/AboutUsPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

type PageFixtures = {
  homePage: HomePage;
  angelfishPage: AngelfishPage;
  urchinPage: UrchinPage;
  consultingPage: ConsultingPage;
  aboutUsPage: AboutUsPage;
  searchResultsPage: SearchResultsPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },
  angelfishPage: async ({ page }, use) => {
    const angelfishPage = new AngelfishPage(page);
    await angelfishPage.goto();
    await use(angelfishPage);
  },
  urchinPage: async ({ page }, use) => {
    const urchinPage = new UrchinPage(page);
    await urchinPage.goto();
    await use(urchinPage);
  },
  consultingPage: async ({ page }, use) => {
    const consultingPage = new ConsultingPage(page);
    await consultingPage.goto();
    await use(consultingPage);
  },
  aboutUsPage: async ({ page }, use) => {
    const aboutUsPage = new AboutUsPage(page);
    await aboutUsPage.goto();
    await use(aboutUsPage);
  },
  searchResultsPage: async ({ page }, use) => {
    const searchResultsPage = new SearchResultsPage(page);
    await use(searchResultsPage);
  },
});

export { expect } from '@playwright/test';
