// e2e/responsive.spec.ts
import { test, expect } from '@playwright/test';

const ROUTES = ['/', '/features/', '/about/', '/docs/getting-started/quickstart/', '/blog/'];

for (const route of ROUTES) {
  test(`${route} — no horizontal overflow`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    await page.goto(route, { waitUntil: 'domcontentloaded' });

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `horizontal overflow of ${overflow}px on ${route}`).toBeLessThanOrEqual(0);
    expect(errors.filter((e) => !e.includes('favicon') && !e.includes('pagefind'))).toEqual([]);
  });

  test(`${route} — visual snapshot`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600); // let animations settle
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.05, fullPage: false });
  });
}
