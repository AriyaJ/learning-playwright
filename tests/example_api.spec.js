/*
import { test, expect } from '@playwright/test';

test.describe('API Testing Examples', () => {
  
  // เคส 1: GET - ตรวจสอบว่าดึงข้อมูลสำเร็จไหม
  test('GET: ดึงข้อมูลรายการสินค้า', async ({ request }) => {
    const response = await request.get('/api/products');
    expect(response.status()).toBe(200); // เช็ค Status Code
    
    const body = await response.json();
    expect(body.length).toBeGreaterThan(0); // เช็คว่ามีข้อมูลส่งกลับมาจริง
    expect(body[0]).toHaveProperty('name'); // เช็คโครงสร้างข้อมูล
  });

  // เคส 2: POST - ตรวจสอบว่าสร้างข้อมูลใหม่ได้ไหม
  test('POST: สร้างสินค้าใหม่', async ({ request }) => {
    const response = await request.post('/api/products', {
      data: {
        name: 'New Gadget',
        price: 999
      }
    });
    expect(response.status()).toBe(201); // 201 หมายถึง Created
    const body = await response.json();
    expect(body.name).toBe('New Gadget'); // เช็คว่าบันทึกค่าได้ตรงตามที่ส่งไป
  });
});

*/