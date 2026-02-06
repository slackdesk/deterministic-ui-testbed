import { test, expect } from '@playwright/test';

test.describe('Deterministic UI Testbed', () => {
  test('Contact form validates then succeeds', async ({ page }) => {
    await page.goto('/playground.html');

    // Sanity: correct page loaded
    await expect(page.getByTestId('card-form')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Contact form' })).toBeVisible();

    // Submit empty form -> expect validation errors
    await page.getByTestId('submit').click();

    const err = page.getByTestId('alert-err');
    await expect(err).toBeVisible();
    await expect(err).toContainText('Email is required');
    await expect(err).toContainText('Topic is required');
    await expect(err).toContainText('Message is required');

    // Fill valid data -> submit -> expect success
    await page.getByTestId('email').fill('qa@example.com');
    await page.getByTestId('topic').selectOption('feedback');
    await page.getByTestId('message').fill('This is a valid test message.');

    await page.getByTestId('submit').click();

    const ok = page.getByTestId('alert-ok');
    await expect(ok).toBeVisible();
    await expect(ok).toContainText('Success');
  });
});
