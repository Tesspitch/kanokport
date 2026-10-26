import { lazy, Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion'

const FloralScene = lazy(() => import('./FloralScene'))
gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const section = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced || !section.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-card', { opacity: 0, scale: 1.035 }, { opacity: 1, scale: 1, duration: 1.7, ease: 'power3.out' })
      gsap.fromTo('.hero-chip', { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: .55, ease: 'power3.out' })
      gsap.to('.hero-cover', { yPercent: 8, scale: 1.04, ease: 'none', scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom top', scrub: 1.1 } })
      gsap.to('.ribbon-a', { xPercent: 10, ease: 'none', scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom top', scrub: 1.2 } })
      gsap.to('.ribbon-b', { xPercent: -12, ease: 'none', scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom top', scrub: 1.4 } })
    }, section)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="top" ref={section} className="relative min-h-[100svh] overflow-hidden bg-[#f6f2f1] pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(183,176,224,.5),transparent_28%),radial-gradient(circle_at_88%_16%,rgba(244,210,176,.42),transparent_25%)]" />
      {!reduced && <Suspense fallback={null}><div className="pointer-events-none absolute inset-0 z-10 opacity-70"><FloralScene /></div></Suspense>}
      <div className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1500px] items-center px-4 py-7 sm:px-7 lg:px-10">
        <div className="hero-card relative z-20 w-full overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/60 p-2 shadow-[0_35px_100px_rgba(65,51,100,.23)] backdrop-blur-md sm:rounded-[2.2rem] sm:p-3">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[1.1rem] sm:rounded-[1.65rem]">
            <img className="hero-cover absolute inset-0 h-full w-full object-cover" src="/assets/portfolio-cover.png" alt="หน้าปกแฟ้มสะสมผลงาน นางกนกกรณ์ แก้วประกอบ" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4b3f73]/25 via-transparent to-white/5" />
            <div className="ribbon-a absolute -bottom-[8%] -left-[5%] h-[24%] w-[73%] rotate-[-5deg] rounded-[50%] border-t border-[#e2c998]/80 bg-gradient-to-b from-[#948bc2]/10 to-[#554b87]/25 blur-[1px]" />
            <div className="ribbon-b absolute -bottom-[12%] right-[-8%] h-[23%] w-[68%] rotate-[5deg] rounded-[50%] border-t border-white/70 bg-gradient-to-b from-white/20 to-[#8e85bd]/25 blur-[1px]" />
          </div>
          <div className="hero-chip absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/80 bg-white/85 px-5 py-2.5 text-sm text-iris shadow-xl backdrop-blur-xl sm:bottom-7 sm:px-7 sm:py-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-gold" aria-hidden="true" />
            <span className="whitespace-nowrap">เลื่อนเพื่อชมเรื่องราว</span>
            <span aria-hidden="true">↓</span>
          </div>
        </div>
      </div>
    </section>
  )
}
