const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://portfolio-akarsh10.vercel.app/contact');
  
  // Fill form
  await page.fill('#name', 'Test User');
  await page.fill('#email', 'test@test.com');
  await page.fill('#message', 'Hello world');
  
  // Intercept network
  page.on('response', response => {
    if (response.url().includes('formsubmit')) {
      console.log('FormSubmit Status:', response.status());
    }
  });

  // Submit
  await page.click('button[type="submit"]');
  
  // Wait a bit
  await page.waitForTimeout(3000);
  
  // Get status text
  const errorText = await page.locator('.form-status').textContent().catch(() => null);
  console.log('Error Text:', errorText);
  
  await browser.close();
})();
