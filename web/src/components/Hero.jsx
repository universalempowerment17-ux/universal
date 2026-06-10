import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { urlFor } from '../lib/sanity'

function resolveSlide(slide) {
  if (!slide) return null

  if (typeof slide === 'string') {
    return {
      src: slide,
      alt: '',
      label: '',
    }
  }

  if (slide.image) {
    if (typeof slide.image === 'string') {
      return {
        src: slide.image,
        alt: slide.alt || slide.title || '',
        label: slide.label || slide.title || '',
      }
    }

    return {
      src: urlFor(slide.image)?.width(1800).height(1200).url() || null,
      alt: slide.alt || slide.title || '',
      label: slide.label || slide.title || '',
    }
  }

  if (slide.asset) {
    return {
      src: urlFor(slide.asset)?.width(1800).height(1200).url() || null,
      alt: slide.alt || slide.title || '',
      label: slide.label || slide.title || '',
    }
  }

  if (slide.src) {
    return {
      src: slide.src,
      alt: slide.alt || slide.title || '',
      label: slide.label || slide.title || '',
    }
  }

  return null
}

export default function Hero({
  label = 'Universal Empowerment Foundation',
  title,
  subtitle,
  showCta = true,
  compact = false,
  image,
  images = [],
  imageAlt = '',
  stats = [],
}) {
  const slideList = useMemo(() => {
    const explicitSlides = images.map(resolveSlide).filter(Boolean)
    const singleSlide = image ? [resolveSlide(image)] : []
    if (singleSlide[0] && typeof image === 'object') {
      singleSlide[0].alt = imageAlt || singleSlide[0].alt
      singleSlide[0].label = label || singleSlide[0].label
    } else if (singleSlide[0]) {
      singleSlide[0].alt = imageAlt || title || ''
      singleSlide[0].label = label || title || ''
    }
    return [...explicitSlides, ...singleSlide].filter((slide) => slide?.src)
  }, [images, image, imageAlt, label])

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (slideList.length < 2) return undefined

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideList.length)
    }, 4500)

    return () => window.clearInterval(intervalId)
  }, [slideList.length])

  useEffect(() => {
    setActiveIndex(0)
  }, [slideList.length])

  return (
    <section className={`relative overflow-hidden text-slate-800 ${compact ? 'py-16 sm:py-20' : 'py-20 sm:py-28'}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50" />

      {slideList.length > 0 && (
        <div className="absolute inset-0">
          {slideList.map((slide, index) => (
            <img
              key={`${slide.src}-${index}`}
              src={slide.src}
              alt={slide.alt || title}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
                index === activeIndex ? 'scale-105 opacity-[0.34]' : 'scale-100 opacity-0'
              }`}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/3 to-slate-900/10" />
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 h-64 w-full bg-gradient-to-t from-white/45 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary sm:text-sm">{label}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg lg:text-xl">
              {subtitle}
            </p>
          )}
          {showCta && (
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/donation"
                className="rounded-full bg-accent px-7 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-[0_12px_24px_rgba(217,119,6,0.18)] transition hover:bg-accent-dark"
              >
                Donate Now
              </Link>
              <Link
                to="/mission"
                className="rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-bold uppercase tracking-wide text-slate-700 transition hover:bg-slate-50"
              >
                Our Work
              </Link>
            </div>
          )}

          {stats.length > 0 && (
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/60 bg-white/85 px-4 py-4 backdrop-blur-sm"
                >
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {slideList.length > 1 && (
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {slideList.map((slide, index) => (
              <button
                key={`${slide.src}-dot-${index}`}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex ? 'w-10 bg-primary' : 'w-2.5 bg-white/70 hover:bg-white'
                }`}
              />
            ))}
            {slideList[activeIndex]?.label ? (
              <p className="ml-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                {slideList[activeIndex].label}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </section>
  )
}
