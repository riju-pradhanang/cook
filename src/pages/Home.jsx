import { useMemo, useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RecipeGrid from '../components/recipes/RecipeGrid'
import { useRecipes } from '../context/RecipesContext'

function ArcCarousel(){
  const images = useMemo(() => [
    { src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', alt: 'Salad' },
    { src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543', alt: 'Burger' },
    { src: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927', alt: 'Pasta' },
    { src: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0', alt: 'Dessert' },
    { src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061', alt: 'Salmon' },
  ], [])
  const [offset, setOffset] = useState(0)
  const [current] = useState(2)
  const containerRef = useRef(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    let raf, last = performance.now()
    const loop = (t) => {
      const dt = t - last; last = t
      if (!paused) setOffset(o => (o + dt * 0.00022) % 1)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [paused])

  const w = 560
  const h = 360
  const r = 220
  const cx = w/2
  const cy = h/2 + 40
  const arcPath = `M ${cx-r} ${cy} A ${r} ${r} 0 0 0 ${cx+r} ${cy}`

  const thumbPositions = images.map((img, i) => {
    const t = ((i / images.length) + offset) % 1
    const ang = Math.PI + (0 - Math.PI) * t
    const x = cx + Math.cos(ang) * r
    const y = cy - Math.sin(ang) * r
    return { img, x, y }
  })

  function nudge(delta){
    setOffset(o => (o + delta + 1) % 1)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[620px] sm:mt-2 md:mt-0"
      style={{ height: `${h}px` }}
      onMouseEnter={()=>setPaused(true)}
      onMouseLeave={()=>setPaused(false)}
    >
      <svg className="w-full" viewBox={`0 0 ${w} ${h}`}> 
        <path d={arcPath} className="stroke-yellow-400/80 [stroke-dasharray:10_12] stroke-[4] fill-none" />
      </svg>
      {thumbPositions.map(({ img, x, y }, idx) => (
        <div
          key={idx}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full ring-4 ring-white shadow-lg"
          style={{ left: x, top: y, width: 60, height: 60 }}
        >
          <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
        </div>
      ))}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-6">
        <div className="h-44 w-44 overflow-hidden rounded-full bg-white shadow-2xl ring-4 ring-white sm:h-56 sm:w-56 md:h-64 md:w-64">
          <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd" alt="Hero" className="h-full w-full object-cover" />
        </div>
      </div>

      {/* Arrow controls */}
      <button
        aria-label="Previous"
        onClick={()=>nudge(-0.06)}
        className="absolute -bottom-4 left-8 grid h-10 w-10 place-items-center rounded-full bg-yellow-400 text-white shadow hover:bg-yellow-500"
      >
        <span className="-rotate-180 text-xl">➜</span>
      </button>
      <button
        aria-label="Next"
        onClick={()=>nudge(0.06)}
        className="absolute -bottom-4 right-8 grid h-10 w-10 place-items-center rounded-full bg-yellow-400 text-white shadow hover:bg-yellow-500"
      >
        <span className="text-xl">➜</span>
      </button>
    </div>
  )
}

export default function Home(){
  const tabs = ['Breakfast','Lunch','Dinner']
  const [tab, setTab] = useState('Breakfast')
  return (
    <div className="relative overflow-hidden">
      {/* Curved yellow backdrop */}
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-[380px] rounded-b-[55%] bg-yellow-300/80 sm:-top-36 sm:h-[440px] md:-top-40 md:h-[500px]"></div>

      <main className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-20 pt-16 md:grid-cols-2 md:pb-28 md:pt-24">
        <section className="order-2 md:order-1">
          <h1 className="text-5xl font-extrabold leading-tight text-yellow-500 md:text-6xl">Delicious</h1>
          <h2 className="mt-2 text-3xl font-semibold text-gray-800 md:text-4xl">Quench the Hunger</h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-gray-600 md:text-base">Discover amazing recipes from around the world. Our virtual assistant helps you
              find the perfect dish for any occasion.</p>
          <button
            onClick={() => document.getElementById('recipes')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="mt-7 inline-flex items-center rounded-full bg-yellow-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-yellow-600 md:px-8 md:text-base"
          >
            Quench now
          </button>
        </section>

        <section className="order-1 flex justify-center md:order-2">
          <ArcCarousel />
        </section>
      </main>

      {/* Featured recipes section to merge landing with app */}
      <FeaturedRecipes />
    </div>
  )
}

function FeaturedRecipes(){
  const { recipes, loading } = useRecipes()
  const top = recipes.slice(0, 6)
  return (
    <section id="recipes" className="mx-auto mt-24 w-full max-w-6xl px-4 pb-12 scroll-mt-24 md:mt-32 md:scroll-mt-40">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Popular Recipes</h3>
        <Link to="/recipes" className="text-sm font-medium text-yellow-600 hover:text-yellow-700">View all</Link>
      </div>
      <RecipeGrid items={top} />
    </section>
  )
}
