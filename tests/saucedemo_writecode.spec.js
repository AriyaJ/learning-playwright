const { test, expect } = require('@playwright/test');

test('เช็คหน้าแรก Swag', async ({ page }) => {
  // 1. สั่งให้เปิดเบราว์เซอร์ไปที่ https://www.saucedemo.com
  await page.goto('https://www.saucedemo.com/');

  // 2. ตรวจสอบว่า "หัวข้อของหน้าเว็บ" (Title) มีคำว่า Swag หรือไม่
  await expect(page).toHaveTitle(/Swag/);
  console.log('เย้! เปิดหน้า swag สำเร็จแล้ว');

   // 3. login ระบบแล้วยืนยัน login แล้ว
  await page.getByRole('textbox',{name : 'Username'}).fill('standard_user')
  //await page.getByRole('textbox',{name : 'Password'}).fill('secret_sauce')
  await page.getByRole('button', {name : 'login' }).click()  
  await expect(page.getByText('Products')).toBeVisible()
  

 // 4. สร้างตัวแปร
const itemsToBuy = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Onesie','Sauce Labs Fleece Jacket'];

// 5. วนลูปตามจำนวน itemsToBuy โดยเอา itemsToBuy ใส่ itemName
for (const itemName of itemsToBuy) {
  await page.locator('.inventory_item')
    .filter({ hasText: itemName })
    .getByRole('button', { name: 'Add to cart' }).click();
    
  console.log(`เพิ่ม ${itemName} ลงตะกร้าแล้ว!`);
}


// 6. เช็ค เลขตะกร้าจากความยาว itemsToBuy โดยแปลงเป็น String 
const cartBadge = page.locator('.shopping_cart_badge');
await expect(cartBadge). toHaveText(itemsToBuy.length.toString())
console.log(`ตรวจสอบแล้ว: ตะกร้ามีสินค้า ${itemsToBuy.length} ชิ้น ตรงตามรายการ!`);

await page.locator('.shopping_cart_container').click();
 

// 7. ดึงชื่อสินค้าทุกตัวในหน้าตะกร้าออกมาเป็น List แล้วเช็คว่าตรงกับ itemsToBuy หรือไม่
const allNamesInCart = page.locator('.inventory_item_name');
await expect(allNamesInCart).toHaveText(itemsToBuy);

console.log('ว้าว! รายชื่อสินค้าทุกอันในตะกร้าตรงตามลำดับและถูกต้องทั้งหมด');

// 8. กด Checkout แล้วแคปรูป
await page.getByRole('button', {name : 'Checkout' }).click()  
await expect(page.getByText('Checkout: Your Information')).toBeVisible()
await page.screenshot({ path: 'screenshot.png' });  

});