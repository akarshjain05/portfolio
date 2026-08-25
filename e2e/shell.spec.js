import { test, expect } from '@playwright/test';

test.describe('IDE Shell Interactive Flow', () => {
  test('Command palette keyboard flow, focus, tab switching', async ({ page }) => {
    await page.goto('/');
    
    // Check initial tab (Home)
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshot.png' });
    await expect(page.locator('.tab.tab--active')).toContainText('home.jsx');

    const isMac = await page.evaluate(() => navigator.platform.toUpperCase().indexOf('MAC') >= 0);
    const modifier = isMac ? 'Meta' : 'Control';
    
    // Open Command Palette
    await page.keyboard.press(`Control+P`);
    const paletteInput = page.locator('.palette-input');
    await expect(paletteInput).toBeVisible();
    
    // Go to Contact
    await paletteInput.fill('contact');
    
    // Click the result
    await page.locator('.palette-item').filter({ hasText: 'contact.css' }).click();
    
    // Tab should change
    await expect(page.locator('.tab.tab--active')).toContainText('contact.css');
    
    // Close tab via clicking the X button
    await page.locator('.tab.tab--active').hover();
    await page.locator('.tab.tab--active .tab__close-btn').click();
    
    // Tab should fallback to a different tab, so it shouldn't be contact.css anymore
    await expect(page.locator('.tab.tab--active')).not.toContainText('contact.css');
  });
});
