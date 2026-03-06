const fs = require("fs");

const story = process.argv.slice(2).join(" ");

const test = `
import { test, expect } from '@playwright/test';

test('${story}', async ({ page }) => {

 await page.goto('/');

 await expect(page.getByRole('heading').first()).toBeVisible();

});
`;

fs.writeFileSync("tests/generated.spec.ts", test);

console.log("Generated Playwright test:");
console.log(test);