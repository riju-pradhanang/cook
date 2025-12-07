import { useEffect, useRef, useState } from 'react'

export default function Intro({ onFinish = () => {} }) {
  const title = 'COOKBOOK'
  const [index, setIndex] = useState(0)
  const [doneTyping, setDoneTyping] = useState(false)
  const [showIllustration, setShowIllustration] = useState(false)
  const [endSoon, setEndSoon] = useState(false)
  const [coverTextGone, setCoverTextGone] = useState(false)
  const containerRef = useRef(null)
  const particlesRef = useRef(null)
  const parallaxRef = useRef({ x: 0, y: 0 })
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReduced) return
    let raf
    const el = particlesRef.current
    if (!el) return
    const ctx = el.getContext('2d')
    const DPR = Math.min(2, window.devicePixelRatio || 1)

    function resize() {
      const { clientWidth, clientHeight } = el
      el.width = clientWidth * DPR
      el.height = clientHeight * DPR
      ctx.scale(DPR, DPR)
    }
    resize()
    const particles = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * el.clientWidth,
      y: Math.random() * el.clientHeight,
      r: 0.5 + Math.random() * 1.5,
      sp: 0.1 + Math.random() * 0.4,
      a: Math.random() * Math.PI * 2,
      hue: 32 + Math.random() * 30,
      alp: 0.15 + Math.random() * 0.2,
    }))

    function tick() {
      const w = el.clientWidth
      const h = el.clientHeight
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => {
        p.a += 0.003
        p.y -= p.sp
        p.x += Math.cos(p.a) * 0.15
        if (p.y < -5) p.y = h + 5
        if (p.x > w + 5) p.x = -5
        if (p.x < -5) p.x = w + 5
        ctx.beginPath()
        ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${p.alp})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    const onResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      resize()
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [prefersReduced])

  useEffect(() => {
    if (prefersReduced) {
      // Instant, quiet version; wait for user click to continue
      setIndex(title.length)
      setDoneTyping(true)
      setShowIllustration(true)
      setEndSoon(true)
      return () => {}
    }
    let id
    let audioCtx
    let lastTime = 0
    function blip() {
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
        const now = audioCtx.currentTime
        if (now - lastTime < 0.02) return
        lastTime = now
        const o = audioCtx.createOscillator()
        const g = audioCtx.createGain()
        o.type = 'square'
        o.frequency.value = 420 + Math.random() * 60
        g.gain.value = 0.02
        o.connect(g)
        g.connect(audioCtx.destination)
        o.start()
        o.stop(now + 0.05)
      } catch {}
    }
    id = setInterval(() => {
      setIndex(prev => {
        const next = Math.min(prev + 1, title.length)
        if (next !== prev) blip()
        if (next === title.length) {
          clearInterval(id)
          setDoneTyping(true)
          setTimeout(() => setShowIllustration(true), 500)
          setTimeout(() => setEndSoon(true), 3000)
        }
        return next
      })
    }, 110)
    return () => clearInterval(id)
  }, [onFinish, prefersReduced])

  // After illustration phase begins, show cover text briefly then open book
  useEffect(() => {
    if (!showIllustration) return
    setCoverTextGone(false)
    const id = setTimeout(() => setCoverTextGone(true), 1100)
    return () => clearTimeout(id)
  }, [showIllustration])

  useEffect(() => {
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    return () => { root.style.overflow = prev }
  }, [])

  useEffect(() => {
    if (prefersReduced) return
    const cont = containerRef.current
    if (!cont) return
    function onMove(e) {
      const rect = cont.getBoundingClientRect()
      const mx = (e.clientX - rect.left) / rect.width - 0.5
      const my = (e.clientY - rect.top) / rect.height - 0.5
      parallaxRef.current = { x: mx, y: my }
      const fg = cont.querySelector('[data-layer="fg"]')
      const mg = cont.querySelector('[data-layer="mg"]')
      const bg = cont.querySelector('[data-layer="bg"]')
      if (bg) bg.style.transform = `translate3d(${mx * 10}px, ${my * 10}px, 0)`
      if (mg) mg.style.transform = `translate3d(${mx * 18}px, ${my * 18}px, 0)`
      if (fg) fg.style.transform = `translate3d(${mx * 28}px, ${my * 28}px, 0)`
    }
    cont.addEventListener('mousemove', onMove)
    return () => cont.removeEventListener('mousemove', onMove)
  }, [prefersReduced])

  const text = title.slice(0, index)

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-neutral-950 text-white flex items-center justify-center overflow-hidden">
      {/* Background gradient layer */}
      <div className={`absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-neutral-900/20 to-amber-950/20 ${doneTyping ? 'animate-softGlowBg' : ''} z-[0]`} data-layer="bg" />

      {/* Floating food background elements (behind book, above bg) */}
      <div className="absolute inset-0 pointer-events-none z-[5]" aria-hidden>
        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=500&auto=format&fit=crop" referrerPolicy="no-referrer" alt="floating pizza" className="absolute top-[10%] left-[6%] w-24 sm:w-32 opacity-50 rotate-[-6deg] float-slowest" />
        <img src="https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=500&auto=format&fit=crop" referrerPolicy="no-referrer" alt="floating salad" className="absolute bottom-[14%] left-[10%] w-28 sm:w-36 opacity-45 rotate-[8deg] float-slower" />
        <img src="https://tse3.mm.bing.net/th/id/OIP.xpB5p1fix19-BSQspCJUzgHaHa?cb=ucfimg2&ucfimg=1&w=2560&h=2560&rs=1&pid=ImgDetMain&o=7&rm=3" referrerPolicy="no-referrer" alt="floating pasta" className="absolute top-[16%] right-[8%] w-28 sm:w-36 opacity-50 rotate-[4deg] float-slow" />
        <img src="https://tse1.mm.bing.net/th/id/OIP.GvkLOG41BmhMsrWB8EF_sQHaEy?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" referrerPolicy="no-referrer" alt="floating spices" className="absolute bottom-[10%] right-[12%] w-20 sm:w-28 opacity-45 rotate-[-10deg] float-slowest" />
      </div>

      {/* Particles canvas */}
      <canvas ref={particlesRef} className="absolute inset-0 w-full h-full opacity-60 z-[2]" />

      {/* Foreground content */}
      <div className={`relative flex flex-col items-center justify-center will-change-transform z-[10] ${doneTyping ? 'intro-zoom' : ''} pb-24 sm:pb-28`} data-layer="mg">
        <div className={`text-center select-none`}>
          <div className={`text-[56px] sm:text-7xl md:text-8xl font-extrabold tracking-[0.25em]`}>
            <span className={`text-white ${doneTyping ? 'neon-glow' : ''}`}>{text}</span>
            {!doneTyping && <span className="glow-caret">|</span>}
          </div>
          <div className="mt-3 text-amber-200/80 text-sm sm:text-base">A warm taste of home</div>
        </div>

        <div className={`mt-10 sm:mt-14 transition-transform duration-[1400ms] ease-[cubic-bezier(.2,1.1,.2,1)] ${showIllustration ? 'translate-x-0 intro-bounce' : 'translate-x-[120%]'} drop-shadow-[0_20px_60px_rgba(255,200,150,0.25)]`} data-layer="fg" style={{zIndex:20}}>
          <Book open={showIllustration} coverTextGone={coverTextGone} />
          {showIllustration && (
            <div className="mt-6 sm:mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => onFinish()}
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white px-7 py-3 text-sm font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300 btn-breathe btn-shimmer btn-rise"
                aria-label="Explore Now"
              >
                Explore Now
                <span aria-hidden>→</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={`absolute inset-0 pointer-events-none ${doneTyping ? 'shadow-glow' : ''}`} />
    </div>
  )
}

function Book({ open, coverTextGone }){
  const imgs = [
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop', // salad
    'https://images.unsplash.com/photo-1543337207-5bf2b0d6c0b7?q=80&w=800&auto=format&fit=crop', // pasta
    'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop', // platter
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop', // breakfast
  ]
  return (
    <div className="book-scene">
      <div className={`book ${open && coverTextGone ? 'book-open' : ''}`}>
        {/* Covers */}
        <div className="book-surface left-cover" />
        <div className="book-surface right-cover" />
        {/* Decorative front cover elements before opening */}
        {open && !coverTextGone && (
          <>
            <div className="cover-pattern" aria-hidden />
            <div className="cover-decor" aria-hidden>
              <div className="cover-badge">EST. 2025</div>
              <div className="cover-ribbon">CHEF'S PICK</div>
            </div>
          </>
        )}
        {/* Cover text before opening */}
        {open && (
          <div className={`cover-text ${coverTextGone ? 'fade-out' : ''}`}>
            <div className="panel">
              <p>Whispers of spice. Stories of warmth. Open to begin.</p>
            </div>
          </div>
        )}
        {/* Spread with blinking food images */}
        <div className="book-spread">
          {imgs.map((src, i) => (
            <img
              key={i}
              src={src}
              referrerPolicy="no-referrer"
              alt={`food ${i+1}`}
              style={{ animationDelay: `${300 + i*180}ms` }}
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=800&auto=format&fit=crop' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
