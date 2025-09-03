import {test, expect} from '@playwright/test';

test('login via API token', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  const loginResp = await page.request.post('http://localhost:8000/api/auth/login/', {
    data: { email: 'test@example.com', password: 'password123' }
  });
  const token = (await loginResp.json()).token;
  
  // Store token in localStorage
  await page.evaluate((token) => {
    localStorage.setItem('token', token);
  }, token);

  
  await expect(page.locator('text=Welcome')).toBeVisible();
});
