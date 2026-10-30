const lessons = [
  { id: 'q12iCJuppEY', title: 'สื่อการสอนชุดที่ 1' },
  { id: 'zVVByevOTzY', title: 'สื่อการสอนชุดที่ 2' },
  { id: 'aCqtcEy0sH4', title: 'สื่อการสอนชุดที่ 3' },
  { id: 'SiN8gE3tQ9Y', title: 'สื่อการสอนชุดที่ 4' },
  { id: '1sz2MHVBxX0', title: 'สื่อการสอนชุดที่ 5' },
  { id: 'MlE-aEtFhLQ', title: 'สื่อการสอนชุดที่ 6' },
]

export function TeachingSection() {
  return (
    <section id="teaching" className="section-shell bg-[#eee9f4] text-[#312b45]">
      <div className="section-inner">
        <p className="eyebrow text-lavender">03 — Teaching Media</p>
        <div className="mb-9 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <h2 className="section-title">สื่อการสอน<br /><span className="text-lavender">ที่ออกแบบเพื่อการเรียนรู้</span></h2>
          <p className="max-w-md text-[#312b45]/60">รวมวิดีโอสื่อการสอนที่คัดเลือกไว้สำหรับการเรียนรู้และการนำเสนอผลงาน</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson, index) => (
            <article key={lesson.id} className="media-card group overflow-hidden">
              <div className="relative aspect-video overflow-hidden bg-[#3d365b]">
                <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube.com/embed/${lesson.id}?rel=0`} title={lesson.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/25 bg-[#241f39]/60 px-3 py-1 text-xs text-white backdrop-blur">บทเรียน {String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="flex items-center justify-between gap-3 p-5"><h3 className="font-display text-xl font-semibold">{lesson.title}</h3><a className="text-sm text-lavender transition hover:underline" href={`https://www.youtube.com/watch?v=${lesson.id}&list=PPSV`} target="_blank" rel="noreferrer">YouTube ↗</a></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
