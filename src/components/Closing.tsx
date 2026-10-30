export function Closing() {
  return (
    <footer id="closing" className="relative overflow-hidden bg-[#4e4679] px-5 py-28 text-center text-white sm:py-36">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#a9a0d0]/25 blur-3xl" />
      <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-[#edcba7]/20 blur-3xl" />
      <div className="relative mx-auto max-w-4xl">
        <div className="mb-8 text-4xl text-[#dbc28d]" aria-hidden="true">✦ ❀ ✦</div>
        <p className="eyebrow text-[#dbc28d]">ด้วยความขอบคุณ</p>
        <h2 className="font-display text-5xl font-semibold leading-tight sm:text-7xl">ขอบพระคุณที่ร่วมเปิดอ่าน<br />เรื่องราวแห่งความภาคภูมิใจ</h2>
        <p className="mx-auto mt-7 max-w-xl text-white/65">นางกนกกรณ์ แก้วประกอบ<br />ครู วิทยฐานะ ครูชำนาญการ · โรงเรียนบัวขาว</p>
        <nav className="mt-11 flex flex-wrap justify-center gap-3" aria-label="ทางลัดส่วนท้าย">
          <a className="closing-link" href="#top">กลับด้านบน</a><a className="closing-link" href="#video">ชมวิดีโอ</a><a className="closing-link" href="#ebook">เปิด E-Book</a><a className="closing-link" href="#teaching">สื่อการสอน</a><a className="closing-link" href="#portfolio-examples">ตัวอย่าง Portfolio</a><a className="closing-link" href="#share">แชร์</a>
        </nav>
      </div>
    </footer>
  )
}
