import { test, expect } from '@playwright/test';

test.describe('Smoke', () => {
  test('home loads and basic widgets exist', async ({ page }) => {
    // Your server serves index.html at /
    await page.goto('/');

    // Basic: page has a title and at least one heading
    await expect(page).toHaveTitle(/Deterministic|Testbed|UI/i);
    await expect(page.getByRole('heading').first()).toBeVisible();

    // Basic: counter controls should exist (adjust names if yours differ)
    // Try common button labels first.
    const inc = page.getByRole('button', { name: /increment|\+|inc/i });
    const dec = page.getByRole('button', { name: /decrement|-|dec/i });

    await expect(inc).toBeVisible();
    await expect(dec).toBeVisible();
  });

  test('can navigate to playground', async ({ page }) => {
    await page.goto('/');

    // Prefer testid or visible link text that the site provides
    const link = page.getByRole('link', { name: /playground/i }).or(page.getByTestId('cta-playground'));
    await expect(link).toBeVisible();
    await link.click();

    await expect(page).toHaveURL(/playground\.html/i);
    await expect(page.getByRole('heading', { name: /playground/i }).or(page.getByRole('heading').first())).toBeVisible();
  });
});