import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?worker&url'

GlobalWorkerOptions.workerSrc = workerSrc
const PdfReader = lazy(() => import('./PdfReader').then((m) => ({ default: m.PdfReader })))
const examples = Array.from({ length: 7 }, (_, index) => ({ number: index + 1, src: `/assets/portfolio-examples/${index + 1}.pdf` }))

function CoverThumbnail({ src, number }: { src: string, number: number }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let cancelled = false
    getDocument(src).promise.then((pdf) => pdf.getPage(1)).then((page) => {
      if (cancelled || !canvas.current) return
      const viewport = page.getViewport({ scale: .72 })
      const context = canvas.current.getContext('2d')
      if (!context) return
      canvas.current.width = viewport.width
      canvas.current.height = viewport.height
      return page.render({ canvasContext: context, viewport }).promise
    }).then(() => { if (!cancelled) setLoading(false) }).catch(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [src])
  return <div className="portfolio-cover-frame">{loading && <div className="portfolio-cover-loading">กำลังเตรียมปก…</div>}<canvas ref={canvas} className="portfolio-cover-canvas" aria-label={`หน้าปก Portfolio เล่ม ${number}`} /></div>
}

export function PortfolioExamples() {
  const [selected, setSelected] = useState<typeof examples[number] | null>(null)
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setSelected(null)
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [])
  return (
    <section id="portfolio-examples" className="section-shell bg-[#f8f4ef] text-[#312b45]">
      <div className="section-inner">
        <p className="eyebrow text-lavender">04 — Selected Portfolio</p>
        <div className="mb-9 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <h2 className="section-title">ตัวอย่าง Portfolio</h2>
          <p className="max-w-md text-[#312b45]/60">คลิกที่หน้าปกเพื่อเปิดอ่าน E-Book ฉบับเต็ม</p>
        </div>
        <div className="portfolio-cover-grid">
          {examples.map((example) => <button key={example.src} className="portfolio-cover-card" onClick={() => setSelected(example)} aria-label={`เปิดอ่าน Portfolio เล่ม ${example.number}`}><CoverThumbnail src={example.src} number={example.number} /><span className="portfolio-cover-label">Portfolio เล่ม {example.number}<span>เปิดอ่าน →</span></span></button>)}
        </div>
      </div>
      {selected && <div className="portfolio-modal" role="dialog" aria-modal="true" aria-label={`Portfolio เล่ม ${selected.number}`} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null) }}><div className="portfolio-modal-panel"><div className="portfolio-modal-heading"><strong>Portfolio เล่ม {selected.number}</strong><div className="flex items-center gap-2"><a className="tool-btn" href={selected.src} download aria-label="ดาวน์โหลด Portfolio">⇩</a><button className="tool-btn" onClick={() => setSelected(null)} aria-label="ปิด">×</button></div></div><Suspense fallback={<div className="reader-state">กำลังเปิด E-Book…</div>}><PdfReader src={selected.src} portrait /></Suspense></div></div>}
    </section>
  )
}
