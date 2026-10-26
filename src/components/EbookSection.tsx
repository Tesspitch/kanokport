import { lazy, Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion'

const PdfReader = lazy(() => import('./PdfReader').then((m) => ({ default: m.PdfReader })))
gsap.registerPlugin(ScrollTrigger)

export function EbookSection() {
  const section = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced || !section.current) return
    const ctx = gsap.context(() => gsap.from('.book-reveal', { y: 70, opacity: 0, duration: 1.05, ease: 'power3.out', scrollTrigger: { trigger: section.current, start: 'top 72%' } }), section)
    return () => ctx.revert()
  }, [reduced])
  return (
    <section id="ebook" ref={section} className="section-shell overflow-hidden bg-[#f5f0ec] text-[#312b45]">
      <div className="section-inner">
        <p className="eyebrow text-lavender">02 — Portfolio E-Book</p>
        <div className="mb-9 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <h2 className="section-title">เปิดอ่านทุกหน้า<br /><span className="text-lavender">ของแฟ้มสะสมผลงาน</span></h2>
          <p className="max-w-md text-[#312b45]/60">พลิกอ่านแบบสองหน้าบนเดสก์ท็อป และหน้าเดียวบนมือถือ พร้อมซูม เต็มจอ และดาวน์โหลด</p>
        </div>
        <div className="book-reveal"><Suspense fallback={<div className="reader-state">กำลังเตรียมเครื่องอ่าน…</div>}><PdfReader /></Suspense></div>
      </div>
    </section>
  )
}
