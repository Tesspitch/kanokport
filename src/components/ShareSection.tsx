import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'

export function ShareSection() {
  const [url, setUrl] = useState('')
  const [copied, setCopied] = useState(false)
  useEffect(() => setUrl(window.location.href), [])
  const copyLink = async () => {
    if (!url) return
    await navigator.clipboard?.writeText(url)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }
  const share = async () => {
    if (navigator.share) await navigator.share({ title: 'แฟ้มสะสมผลงาน | นางกนกกรณ์ แก้วประกอบ', text: 'แฟ้มสะสมผลงาน โรงเรียนบัวขาว', url })
    else await copyLink()
  }
  return (
    <section id="share" className="section-shell bg-[#eee9f4] text-[#312b45]">
      <div className="mx-auto grid max-w-5xl items-center gap-10 rounded-[2rem] border border-white/80 bg-white/65 p-7 shadow-[0_24px_75px_rgba(70,53,105,.14)] backdrop-blur sm:p-10 md:grid-cols-[1fr_auto]">
        <div><p className="eyebrow text-lavender">05 — Share Portfolio</p><h2 className="section-title text-4xl sm:text-5xl">แชร์แฟ้มสะสมผลงาน</h2><p className="mt-4 max-w-xl text-[#312b45]/65">ส่งต่อผลงานให้ผู้ชมเปิดอ่านได้ง่ายจากลิงก์หรือ QR Code</p><div className="mt-7 flex flex-wrap gap-3"><button className="share-btn share-btn-primary" onClick={share}>แชร์ลิงก์</button><button className="share-btn" onClick={copyLink}>{copied ? 'คัดลอกแล้ว ✓' : 'คัดลอกลิงก์'}</button></div><p className="mt-4 max-w-lg truncate text-xs text-[#312b45]/45" title={url}>{url || 'กำลังเตรียมลิงก์…'}</p></div>
        <div className="qr-card"><div className="rounded-xl bg-white p-3"><QRCode value={url || 'https://example.com'} size={176} bgColor="#ffffff" fgColor="#312b45" /></div><span>สแกนเพื่อเปิดเว็บ</span></div>
      </div>
    </section>
  )
}
