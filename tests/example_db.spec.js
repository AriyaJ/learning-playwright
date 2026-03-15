import { test, expect } from '@playwright/test';
const mysql = require('mysql2/promise'); // ตัวอย่างการใช้ MySQL

test('Check DB: ตรวจสอบสถานะ Order ในฐานข้อมูล', async () => {
  // 1. สร้างการเชื่อมต่อ DB
  const connection = await mysql.createConnection({
    host: 'localhost', user: 'root', database: 'shop_db'
  });

  // 2. Query ข้อมูล
  const [rows] = await connection.execute('SELECT status FROM orders WHERE id = ?', ['ORD-001']);

  // 3. ตรวจสอบค่า
  expect(rows[0].status).toBe('COMPLETED');
  
  await connection.end();
});

test('UI to DB: สมัครสมาชิกแล้วข้อมูลต้องเข้า DB จริง', async ({ page }) => {
  const testEmail = `test${Date.now()}@example.com`;

  // --- ส่วนของ UI ---
  await page.goto('/register');
  await page.fill('#username', 'TestUser');
  await page.fill('#email', testEmail);
  await page.click('#submit-button');

  // เช็คหน้าจอว่าขึ้นข้อความสำเร็จไหม
  await expect(page.locator('.success-msg')).toBeVisible();

  // --- ส่วนของ DB ---
  const connection = await mysql.createConnection({ /* config */ });
  
  // รอสักครู่เพื่อให้ระบบบันทึกข้อมูล (Optional)
  const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [testEmail]);

  // ตรวจสอบว่ามีข้อมูลใน DB จริงและชื่อตรงกัน
  expect(rows.length).toBe(1);
  expect(rows[0].username).toBe('TestUser');

  await connection.end();
});