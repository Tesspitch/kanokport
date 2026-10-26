import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { GlobalWorkerOptions, getDocument, type PDFDocumentProxy } from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?worker&url'

GlobalWorkerOptions.workerSrc = workerSrc

type PdfPageProps = { pdf: PDFDocumentProxy, number: number, scale: number }
const PdfPage = forwardRef<HTMLDivElement, PdfPageProps>(({ pdf, number, scale }, ref) => {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let cancelled = false
    let renderTask: ReturnType<Awaited<ReturnType<PDFDocumentProxy['getPage']>>['render']> | undefined
    pdf.getPage(number).then((page) => {
      if (cancelled || !canvas.current) return
      const viewport = page.getViewport({ scale: 1.15 * scale })
      const context = canvas.current.getContext('2d')
      if (!context) return
      canvas.current.width = viewport.width
      canvas.current.height = viewport.height
      renderTask = page.render({ canvasContext: context, viewport })
      return renderTask.promise
    }).then(() => !cancelled && setLoading(false)).catch((err) => {
      if (err?.name !== 'RenderingCancelledException') console.error(err)
    })
    return () => { cancelled = true; renderTask?.cancel() }
  }, [pdf, number, scale])
  return <div ref={ref} className="pdf-page bg-white"><div className="relative h-full w-full"><canvas ref={canvas} className="h-full w-full object-contain" aria-label={`หน้าที่ ${number}`} />{loading && <div className="absolute inset-0 grid place-items-center bg-white text-sm text-iris/60">กำลังเตรียมหน้า {number}…</div>}</div></div>
})
PdfPage.displayName = 'PdfPage'

type FlipRef = { pageFlip: () => { flipNext: () => void, flipPrev: () => void, turnToPage: (page: number) => void } }

export function PdfReader() {
  const shell = useRef<HTMLDivElement>(null)
  const book = useRef<FlipRef | null>(null)
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null)
  const [page, setPage] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [mobile, setMobile] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [error, setError] = useState('')
  const load = useCallback(async () => {
    try { setPdf(await getDocument('/assets/portfolio.pdf').promise) }
    catch { setError('ไม่สามารถเปิด E-Book ได้ กรุณาลองดาวน์โหลดไฟล์แทน') }
  }, [])
  useEffect(() => { load() }, [load])
  useEffect(() => {
    const update = () => setMobile(window.innerWidth < 768)
    update(); window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  useEffect(() => {
    const update = () => setFullscreen(document.fullscreenElement === shell.current)
    document.addEventListener('fullscreenchange', update)
    return () => document.removeEventListener('fullscreenchange', update)
  }, [])
  const go = (value: number) => {
    const target = Math.min(Math.max(value, 1), pdf?.numPages ?? 1)
    book.current?.pageFlip().turnToPage(target - 1)
    setPage(target)
  }
  if (error) return <div className="reader-state">{error}<a href="/assets/portfolio.pdf" download className="mt-4 underline">ดาวน์โหลด PDF</a></div>
  if (!pdf) return <div className="reader-state"><span className="loader" />กำลังเปิดแฟ้มสะสมผลงาน…</div>
  const bookWidth = fullscreen ? Math.min(window.innerWidth - 96, 1500) : 720
  const bookHeight = fullscreen ? Math.min(window.innerHeight - 170, 850) : 405
  return (
    <div ref={shell} className="reader-shell">
      <div className="reader-toolbar">
        <div><span className="hidden text-xs text-white/50 sm:inline">หน้า </span><strong>{page}</strong><span className="text-white/45"> / {pdf.numPages}</span></div>
        <div className="flex items-center gap-2">
          <button className="tool-btn" onClick={() => setZoom((z) => Math.max(.75, z - .25))} aria-label="ย่อ">−</button>
          <span className="w-12 text-center text-xs text-white/60">{Math.round(zoom * 100)}%</span>
          <button className="tool-btn" onClick={() => setZoom((z) => Math.min(1.5, z + .25))} aria-label="ขยาย">＋</button>
          <button className="tool-btn" onClick={() => shell.current?.requestFullscreen()} aria-label="เต็มหน้าจอ">⛶</button>
          <a className="tool-btn" href="/assets/portfolio.pdf" download aria-label="ดาวน์โหลด">⇩</a>
        </div>
      </div>
      <div className={`book-stage ${page === 1 && !mobile ? 'cover-mode' : ''}`} style={{ transform: fullscreen ? 'none' : `scale(${zoom})` }}>
        <HTMLFlipBook key={`${mobile ? 'mobile' : 'desktop'}-${fullscreen ? 'fullscreen' : 'windowed'}`} ref={book as never} width={bookWidth} height={bookHeight} size="stretch" minWidth={280} maxWidth={bookWidth} minHeight={158} maxHeight={bookHeight} showCover={!mobile} mobileScrollSupport={true} usePortrait={mobile} maxShadowOpacity={.35} drawShadow={!mobile} flippingTime={700} className="flip-book" style={{}} startPage={0} startZIndex={0} autoSize={true} clickEventForward={true} useMouseEvents={true} swipeDistance={24} showPageCorners={!mobile} disableFlipByClick={false} onFlip={(e) => setPage(e.data + 1)}>
          {Array.from({ length: pdf.numPages }, (_, i) => <PdfPage key={i + 1} pdf={pdf} number={i + 1} scale={zoom} />)}
        </HTMLFlipBook>
      </div>
      <div className="reader-nav">
        <button className="nav-btn" onClick={() => { book.current?.pageFlip().flipPrev(); setPage((p) => Math.max(1, p - (mobile ? 1 : 2))) }} disabled={page <= 1}>← ก่อนหน้า</button>
        <label className="hidden items-center gap-2 text-xs text-white/55 sm:flex">ไปหน้า<input className="w-16 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-center text-white" type="number" min="1" max={pdf.numPages} value={page} onChange={(e) => go(Number(e.target.value))} /></label>
        <button className="nav-btn" onClick={() => { book.current?.pageFlip().flipNext(); setPage((p) => Math.min(pdf.numPages, p + (mobile ? 1 : 2))) }} disabled={page >= pdf.numPages}>ถัดไป →</button>
      </div>
    </div>
  )
}
