import { test, expect } from '@playwright/test';

test('can navigate from home to playground', async ({ page }) => {
  await page.goto('/index.html');
  await expect(page.getByRole('heading', { name: /welcome to slackdesk/i })).toBeVisible();

  await page.getByRole('link', { name: /playground/i }).click();

  await expect(page).toHaveURL(/playground\.html/);
  await expect(page.getByRole('heading', { name: /playground/i })).toBeVisible();
});