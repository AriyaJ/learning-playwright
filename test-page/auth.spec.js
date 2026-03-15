const { test } = require('@playwright/test');
const { LoginPage } = require('../test-page/LoginPage');

test('User can login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await page.goto('https://www.saucedemo.com');
  // เรียกใช้ Feature ที่เราแยกไว้
  await loginPage.login('standard_user', 'secret_sauce'); 
  await page.screenshot({ path: 'screenshot1.png' });  
});