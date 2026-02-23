import { test, expect } from '@playwright/test';

test.describe('Playground - deterministic interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/playground.html');
  });

  test('form validation: shows error then success', async ({ page }) => {
    // These are intentionally generic. Replace with your real testids/labels.
    const name = page.getByLabel(/name/i).or(page.getByTestId('name'));
    const email = page.getByLabel(/email/i).or(page.getByTestId('email'));
    const message = page.getByLabel(/message/i).or(page.getByTestId('message'));
    const submit = page.getByRole('button', { name: /submit/i }).or(page.getByTestId('submit'));

    await submit.click();

    // Expect *some* visible validation feedback
    await expect(page.getByText(/required|invalid|missing/i).first()).toBeVisible();

    await name.fill('Harry');
    await email.fill('harry@example.com');
    await message.fill('This is a deterministic test message long enough to pass.');

    await submit.click();

    // Expect *some* success signal
    await expect(page.getByText(/success|submitted|thanks|ok/i).first()).toBeVisible();
  });

  test('modal: open, close, confirm updates state', async ({ page }) => {
    const open = page.getByRole('button', { name: /open modal|open dialog/i }).or(page.getByTestId('open-modal'));
    await open.click();

    const dialog = page.getByRole('dialog').or(page.getByTestId('modal'));
    await expect(dialog).toBeVisible();

    const confirm = page.getByRole('button', { name: /confirm|ok/i }).or(page.getByTestId('modal-confirm'));
    await confirm.click();

    // Dialog should close and page should show state change
    await expect(dialog).toBeHidden();
    await expect(page.getByText(/confirmed|saved|done/i).first()).toBeVisible();
  });

  test('tabs: clicking changes aria-selected / panel visibility', async ({ page }) => {
    // If your tabs are proper ARIA tabs, this is great:
    const tabs = page.getByRole('tab');
    await expect(tabs.first()).toBeVisible();

    const first = tabs.nth(0);
    const second = tabs.nth(1);

    await first.click();
    await expect(first).toHaveAttribute(/aria-selected/i, /true/i);

    await second.click();
    await expect(second).toHaveAttribute(/aria-selected/i, /true/i);
  });

  test('accordion: details opens and reveals content', async ({ page }) => {
    // Native <details> is role=group isn’t always consistent; simplest:
    const details = page.locator('details').first();
    await expect(details).toBeVisible();

    await details.click();
    await expect(details).toHaveAttribute('open', '');
  });

  test('filterable table: filtering changes rows / empty state', async ({ page }) => {
    const filter = page.getByRole('textbox', { name: /filter|search/i }).or(page.getByTestId('table-filter'));
    await filter.fill('zzzz-not-found');

    // Expect some empty state text
    await expect(page.getByText(/no results|empty|nothing found/i).first()).toBeVisible();

    await filter.fill('');
    // Expect table-ish content returns (generic)
    await expect(page.locator('table').or(page.getByTestId('table'))).toBeVisible();
  });

  test('download: triggers a file download', async ({ page }) => {
    // Replace with your real link/button name/testid
    const downloadTrigger =
      page.getByRole('link', { name: /download/i })
        .or(page.getByRole('button', { name: /download/i }))
        .or(page.getByTestId('download'));

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      downloadTrigger.click()
    ]);

    // The file name may differ; you mentioned sample.txt in README structure
    expect(download.suggestedFilename()).toMatch(/\.txt$/i);
  });
});