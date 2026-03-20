# 1. ใช้ Image พื้นฐานที่มี Playwright และเบราว์เซอร์ติดตั้งมาแล้ว
FROM mcr.microsoft.com/playwright:v1.58.2-jammy

# 2. สร้างโฟลเดอร์สำหรับทำงานในตัว Docker
WORKDIR /app

# 3. ก๊อปปี้ไฟล์ package เพื่อไปติดตั้ง library (Dependencies)
COPY package*.json ./
RUN npm install

# 4. ก๊อปปี้โค้ดทั้งหมดในเครื่องเราเข้าไปใน Docker
COPY . .

# 5. สั่งรันเทสเมื่อ Container เริ่มทำงาน
CMD ["npx", "playwright", "test"]