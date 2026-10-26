import { Hero } from './components/Hero'
import { VideoSection } from './components/VideoSection'
import { EbookSection } from './components/EbookSection'
import { Closing } from './components/Closing'

function App() {
  return (
    <>
      <a href="#main" className="skip-link">ข้ามไปยังเนื้อหาหลัก</a>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-[#faf7f2]/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-8" aria-label="เมนูหลัก">
          <a href="#top" className="font-display text-xl font-semibold text-iris"><span className="mr-2 text-gold">✦</span>แฟ้มสะสมผลงาน</a>
          <div className="flex items-center gap-1 text-sm text-iris/75 sm:gap-3">
            <a className="top-link" href="#video">วิดีโอ</a><a className="top-link" href="#ebook">E-Book</a>
          </div>
        </nav>
      </header>
      <main id="main"><Hero /><VideoSection /><EbookSection /></main>
      <Closing />
    </>
  )
}
export default App
