import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)
const format = (seconds: number) => `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`

export function VideoSection() {
  const section = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useState(0)
  const [volume, setVolume] = useState(1)
  const [error, setError] = useState(false)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced || !section.current) return
    const ctx = gsap.context(() => gsap.from('.video-reveal', { y: 90, opacity: 0, scale: .95, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: section.current, start: 'top 72%' } }), section)
    return () => ctx.revert()
  }, [reduced])
  const toggle = async () => {
    if (!video.current) return
    if (video.current.paused) await video.current.play(); else video.current.pause()
  }
  return (
    <section id="video" ref={section} className="section-shell bg-[#211d36] text-white">
      <div className="section-inner">
        <p className="eyebrow text-[#d8c08d]">01 — Presentation</p>
        <div className="mb-9 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <h2 className="section-title max-w-3xl">วิดีโอนำเสนอ<br /><span className="text-[#b8b0dc]">เส้นทางแห่งวิชาชีพครู</span></h2>
          <p className="max-w-md text-white/60">รับชมวิดีโอนำเสนอประกอบแฟ้มสะสมผลงานฉบับจริง</p>
        </div>
        <div className="video-reveal overflow-hidden rounded-[1.8rem] border border-white/10 bg-black shadow-[0_30px_100px_rgba(0,0,0,.4)]">
          <div className="group relative aspect-video bg-black">
            <video ref={video} className="h-full w-full" src="/assets/presentation.mp4" preload="metadata" playsInline
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
              onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setError(true)} />
            {error && <div className="absolute inset-0 grid place-items-center p-6 text-center text-white/70">ไม่สามารถโหลดวิดีโอได้ กรุณาตรวจสอบไฟล์สื่อ</div>}
            {!playing && !error && <button className="absolute inset-0 m-auto grid h-20 w-20 place-items-center rounded-full border border-white/40 bg-white/15 text-2xl backdrop-blur-md transition hover:scale-105 hover:bg-white/25" onClick={toggle} aria-label="เล่นวิดีโอ">▶</button>}
          </div>
          <div className="grid gap-3 bg-[#171426] px-4 py-4 sm:grid-cols-[auto_1fr_auto_auto] sm:items-center sm:px-6">
            <button className="control-btn" onClick={toggle} aria-label={playing ? 'หยุดชั่วคราว' : 'เล่น'}>{playing ? '❚❚' : '▶'}</button>
            <label className="flex items-center gap-3 text-xs text-white/65"><span>{format(current)}</span><input className="media-range flex-1" type="range" min="0" max={duration || 0} step=".1" value={current} onChange={(e) => { if (video.current) video.current.currentTime = Number(e.target.value) }} aria-label="ตำแหน่งวิดีโอ" /><span>{format(duration)}</span></label>
            <label className="flex items-center gap-2 text-xs text-white/65">◕<input className="media-range w-20" type="range" min="0" max="1" step=".05" value={volume} onChange={(e) => { const v = Number(e.target.value); setVolume(v); if (video.current) video.current.volume = v }} aria-label="ระดับเสียง" /></label>
            <button className="control-btn" onClick={() => video.current?.requestFullscreen()} aria-label="เต็มหน้าจอ">⛶</button>
          </div>
        </div>
      </div>
    </section>
  )
}
