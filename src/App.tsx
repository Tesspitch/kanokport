import { useState } from 'react'
import { Hero } from './components/Hero'
import { VideoSection } from './components/VideoSection'
import { EbookSection } from './components/EbookSection'
import { TeachingSection } from './components/TeachingSection'
import { PortfolioExamples } from './components/PortfolioExamples'
import { ShareSection } from './components/ShareSection'
import { Closing } from './components/Closing'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  return (
    <>
      <a href="#main" className="skip-link">ข้ามไปยังเนื้อหาหลัก</a>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-[#faf7f2]/80 backdrop-blur-xl">
        <nav className="relative mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-8" aria-label="เมนูหลัก">
          <a href="#top" className="whitespace-nowrap font-display text-base font-semibold text-iris sm:text-xl"><span className="mr-1.5 text-gold sm:mr-2">✦</span>แฟ้มสะสมผลงาน</a>
          <button className="mobile-menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="site-menu" aria-label={menuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}><span /><span /><span /></button>
          <div id="site-menu" className={`top-nav-links ${menuOpen ? 'is-open' : ''}`}>
            <a className="top-link" href="#video" onClick={closeMenu}>วิดีโอ</a><a className="top-link" href="#ebook" onClick={closeMenu}>E-Book</a><a className="top-link" href="#teaching" onClick={closeMenu}>สื่อการสอน</a><a className="top-link" href="#portfolio-examples" onClick={closeMenu}>ตัวอย่าง Portfolio</a><a className="top-link" href="#share" onClick={closeMenu}>แชร์</a>
          </div>
        </nav>
      </header>
      <main id="main"><Hero /><VideoSection /><EbookSection /><TeachingSection /><PortfolioExamples /><ShareSection /></main>
      <Closing />
    </>
  )
}
export default App
