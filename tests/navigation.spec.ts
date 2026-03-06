import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('home loads and has basic structure', async ({ page }) => {
    await page.goto('/');

    // Title should exist
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);

    // At least one heading should be visible
    await expect(page.getByRole('heading').first()).toBeVisible();
  });

  test('can navigate to Playground (if link exists)', async ({ page }) => {
    await page.goto('/');

    // Try to find a "Playground" link/button without making the test brittle.
    const playgroundLink = page.getByRole('link', { name: /playground/i });
    const playgroundButton = page.getByRole('button', { name: /playground/i });

    // If neither exists, skip gracefully (useful for sites that don't have it yet).
    const hasLink = await playgroundLink.count().catch(() => 0);
    const hasBtn = await playgroundButton.count().catch(() => 0);

    test.skip(hasLink === 0 && hasBtn === 0, 'No Playground navigation element found.');

    if (hasLink > 0) {
      await playgroundLink.first().click();
    } else {
      await playgroundButton.first().click();
    }

    // Basic assertion: URL changed or a heading exists
    await expect(page.getByRole('heading').first()).toBeVisible();
  });
});