import { Page, expect } from '@playwright/test';

/**
 * Assert that the page URL matches the expected path (after the base URL).
 */
export async function assertPagePath(page: Page, expectedPath: string): Promise<void> {
  await expect(page).toHaveURL(new RegExp(escapeRegex(expectedPath)));
}

/**
 * Assert that <title> contains the expected string (case-insensitive).
 */
export async function assertTitleContains(page: Page, text: string): Promise<void> {
  await expect(page).toHaveTitle(new RegExp(text, 'i'));
}

/**
 * Escape special regex characters in a plain string.
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
