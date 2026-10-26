# แฟ้มสะสมผลงาน — นางกนกกรณ์ แก้วประกอบ

เว็บไซต์พอร์ตโฟลิโอครูแบบ single-page สร้างด้วย React, Vite, TypeScript และ Tailwind CSS พร้อม GSAP ScrollTrigger, React Three Fiber, วิดีโอจริง และเครื่องอ่าน PDF แบบพลิกหน้า

## เริ่มใช้งาน

```bash
npm install
npm run dev
```

เปิด URL ที่ Vite แสดงในเทอร์มินัล (ปกติคือ `http://localhost:5173`)

## ตรวจสอบและสร้างไฟล์สำหรับใช้งานจริง

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

ผลลัพธ์ production อยู่ในโฟลเดอร์ `dist/`

## โครงสร้างสื่อ

- `public/assets/portfolio-cover.png` — หน้าปกที่เรนเดอร์จาก PDF ต้นฉบับ
- `public/assets/presentation.mp4` — วิดีโอนำเสนอจริง
- `public/assets/portfolio.pdf` — E-Book ฉบับจริง 22 หน้า

ทุกไฟล์ทำงานแบบ local-only ไม่มี backend, database, SSR หรือการเชื่อมต่อ repository
# kanokport
