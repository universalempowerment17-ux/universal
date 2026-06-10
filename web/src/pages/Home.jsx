import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import StoryCard from '../components/StoryCard'
import DonateBanner from '../components/DonateBanner'
import GalleryGrid from '../components/GalleryGrid'
import { fetchGalleryItems, fetchSiteSettings, fetchStoryItems, sanityConfigured, urlFor } from '../lib/sanity'

const interventions = [
  {
    title: 'Education Support',
    description: 'Free and supportive education for underprivileged children to help them build a better future.',
  },
  {
    title: 'Special Needs Support',
    description: 'Guidance, counselling, and learning support for special needs children and their parents.',
  },
  {
    title: 'Parent Counselling',
    description: 'Helping parents understand their child’s needs and supporting them emotionally and practically.',
  },
  {
    title: 'Skill Development',
    description: 'Providing creative and skill-based opportunities to help children become confident and independent.',
  },
  {
    title: 'Community Awareness',
    description: 'Creating awareness about inclusion, disability rights, education, and equal opportunities.',
  },
]

function parseCounterValue(rawValue) {
  const normalizedValue = String(rawValue ?? '').trim()
  const match = normalizedValue.match(/^([^0-9-]*)([0-9,]+(?:\.[0-9]+)?)(.*)$/)

  if (!match) {
    return {
      prefix: '',
      target: null,
      suffix: '',
      raw: normalizedValue,
    }
  }

  const prefix = match[1] || ''
  const numericPart = match[2] || '0'
  const suffix = match[3] || ''
  const target = Number(numericPart.replace(/,/g, ''))

  return {
    prefix,
    target: Number.isFinite(target) ? target : null,
    suffix,
    raw: normalizedValue,
  }
}

function AnimatedCounter({ value }) {
  const parsed = useMemo(() => parseCounterValue(value), [value])
  const [displayValue, setDisplayValue] = useState(parsed.raw)

  useEffect(() => {
    if (parsed.target === null) {
      setDisplayValue(parsed.raw)
      return undefined
    }

    let frameId = 0
    const startTime = window.performance.now()
    const duration = 1400

    const updateValue = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.round(parsed.target * easedProgress)
      setDisplayValue(
        `${parsed.prefix}${currentValue.toLocaleString('en-US')}${parsed.suffix}`
      )

      if (progress < 1) {
        frameId = window.requestAnimationFrame(updateValue)
      }
    }

    setDisplayValue(`${parsed.prefix}0${parsed.suffix}`)
    frameId = window.requestAnimationFrame(updateValue)

    return () => window.cancelAnimationFrame(frameId)
  }, [parsed])

  return <span>{displayValue}</span>
}

export default function Home() {
  const [galleryItems, setGalleryItems] = useState([])
  const [previewItems, setPreviewItems] = useState([])
  const [siteSettings, setSiteSettings] = useState(null)
  const [storyItems, setStoryItems] = useState([])
  const [slidesPerView, setSlidesPerView] = useState(1)
  const [activeStoryIndex, setActiveStoryIndex] = useState(0)
  const impactStats = useMemo(() => {
    return (siteSettings?.impactStats || [])
      .map((stat) => ({
        label: stat?.label?.trim(),
        value: stat?.value?.trim(),
      }))
      .filter((stat) => stat.label && stat.value)
  }, [siteSettings])

  useEffect(() => {
    if (!sanityConfigured) return

    Promise.all([fetchGalleryItems(), fetchSiteSettings(), fetchStoryItems()]).then(([items, settings, stories]) => {
      setGalleryItems(items)
      setPreviewItems(items.slice(0, 3))
      setSiteSettings(settings)
      setStoryItems(stories)
    })
  }, [])

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3)
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2)
      } else {
        setSlidesPerView(1)
      }
    }

    updateSlidesPerView()
    window.addEventListener('resize', updateSlidesPerView)

    return () => window.removeEventListener('resize', updateSlidesPerView)
  }, [])

  useEffect(() => {
    setActiveStoryIndex(0)
  }, [storyItems.length, slidesPerView])

  useEffect(() => {
    if (storyItems.length <= 3) return undefined

    const maxIndex = Math.max(storyItems.length - slidesPerView, 0)
    const intervalId = window.setInterval(() => {
      setActiveStoryIndex((current) => (current >= maxIndex ? 0 : current + 1))
    }, 4200)

    return () => window.clearInterval(intervalId)
  }, [storyItems.length, slidesPerView])

  const heroSlides = useMemo(() => {
    return (siteSettings?.homeHeroImages || []).map((image, index) => ({
      image,
      alt: `Homepage slide ${index + 1}`,
    }))
  }, [siteSettings])

  const beliefImageUrl = siteSettings?.homeBeliefImage
    ? urlFor(siteSettings.homeBeliefImage)?.width(1200).height(1400).url()
    : null

  const founderImageUrl = siteSettings?.founderImage
    ? urlFor(siteSettings.founderImage)?.width(1200).height(1400).url()
    : null

  const stories = storyItems
  const carouselStories = stories.length > 3 ? stories : stories.slice(0, 3)
  const shouldAutoRotateStories = stories.length > 3
  const maxStoryIndex = Math.max(carouselStories.length - slidesPerView, 0)
  const visibleStoryIndex = Math.min(activeStoryIndex, maxStoryIndex)

  const openVolunteerForm = () => {
    window.dispatchEvent(new Event('uef:open-volunteer-form'))
  }

  return (
    <>
      <Hero
        title="Empowering Lives Through Education, Care & Inclusion"
        subtitle="Universal Empowerment Foundation is dedicated to supporting special needs children, underprivileged students, and families through education, counselling, skill development, and community support."
        images={heroSlides}
        imageAlt="Community empowerment work by Universal Empowerment Foundation"
        stats={impactStats}
        secondaryCtaLabel="Become a Volunteer"
        secondaryCtaAction={openVolunteerForm}
      />

      <section className="section-pad mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <SectionHeading
              label="Our Belief"
              title="Why Empowerment Matters"
              description="Strong communities are built when women, children, and families have access to education, health, livelihoods, and the confidence to lead change."
            />
            <div className="mt-8 space-y-4 leading-relaxed text-slate-700">
              <p>
                Over the past decade, equality and access to opportunity have become critical for social
                progress and long-term economic strength. Empowerment is not a side goal. It is the
                foundation for a fair and sustainable society.
              </p>
              <p>
                When communities are equipped with knowledge, healthcare, and earning opportunities, they
                can shape their own future. That is the work we support every day through grassroots
                programmes designed with local people, not just for them.
              </p>
              <p className="font-medium text-primary">
                The result is a stronger society where more voices are heard and more families can thrive.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
            {beliefImageUrl ? (
              <img
                src={beliefImageUrl}
                alt="Community work"
                className="h-96 w-full rounded-3xl object-cover"
              />
            ) : (
              <div className="flex h-96 items-end rounded-3xl bg-slate-50 p-6 text-slate-700">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary-dark">Belief Image</p>
                  <h3 className="mt-3 text-2xl font-bold text-slate-800">Add your Sanity image here</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
                    Upload a homepage belief image in Site Settings and it will appear here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
              {founderImageUrl ? (
                <img
                  src={founderImageUrl}
                  alt="Founder portrait"
                  className="h-96 w-full rounded-3xl object-cover"
                />
              ) : (
                <div className="flex h-96 items-center justify-center rounded-3xl bg-slate-50 px-6 text-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary-dark">Founder Image</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      Add the founder portrait in Sanity to display it here.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div>
              <SectionHeading label="Founder" title="Message From The Founder" />
              <div className="mt-8 space-y-4 leading-relaxed text-slate-700">
                <p>
                  At Universal Empowerment Foundation, we believe that every child deserves love, respect,
                  education, and equal opportunities. Our aim is to create a supportive environment where
                  children with special needs and children from deprived sections can learn, grow, and
                  become independent.
                </p>
                <p className="rounded-3xl border-l-4 border-accent bg-surface p-5 text-slate-700">
                  — Sonika Dubey
                  <br />
                  Founder, Universal Empowerment Foundation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            label="Our Work"
            title="What We Do"
            description="Our work focuses on education, special needs support, counselling, and inclusion for children and families."
          />
          <p className="mt-6 max-w-3xl leading-relaxed text-slate-700">
            We build supportive spaces where children and parents can learn, grow, and feel confident
            about the future. Each programme is designed to create practical support and lasting
            independence.
          </p>
          <Link
            to="/our-work"
            className="mt-6 inline-flex text-sm font-bold uppercase tracking-wide text-accent-dark hover:text-primary"
          >
            Explore Our Work -
          </Link>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading label="Programmes" title="Our Interventions" center />
        <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {interventions.map((item) => (
            <div
              key={item.title}
              className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(15,23,42,0.08)]"
            >
              <h3 className="text-sm font-bold uppercase tracking-wide text-primary group-hover:text-accent-dark">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/our-work"
            className="inline-flex rounded-full bg-primary px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-primary-dark"
          >
            View All Programmes
          </Link>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-14 text-slate-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading label="Results" title="Our Impact" center />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {impactStats.map((stat) => (
              <div key={`${stat.label}-${stat.value}`} className="text-center">
                <div className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-[0_18px_35px_rgba(15,23,42,0.04)]">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="text-lg font-bold">UEF</span>
                  </div>
                  <p className="mt-5 text-3xl font-bold text-primary sm:text-4xl">
                    <AnimatedCounter value={stat.value} />
                  </p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-slate-700">
            Together, we are creating a more inclusive and empowered society.
          </p>
        </div>
      </section>

      {stories.length > 0 && (
        <section className="section-pad bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              label="Real Lives"
              title="Stories Of Change"
              description="Shared experiences from families and community members whose lives are being supported through UEF."
              center
            />
            {shouldAutoRotateStories ? (
              <div className="mt-10 overflow-hidden rounded-4xl border border-slate-200 bg-white p-2 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{
                    transform: `translateX(-${visibleStoryIndex * (100 / slidesPerView)}%)`,
                  }}
                >
                  {carouselStories.map((story) => (
                    <div
                      key={`${story.name}-${story.location}`}
                      className="shrink-0 px-2 py-2"
                      style={{ flex: `0 0 ${100 / slidesPerView}%` }}
                    >
                      <StoryCard {...story} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {stories.map((story) => (
                  <StoryCard key={`${story.name}-${story.location}`} {...story} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {previewItems.length > 0 && (
        <section className="section-pad bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <SectionHeading label="Gallery" title="Changes That Inspire Us" />
              <Link
                to="/gallery"
                className="text-sm font-bold uppercase tracking-wide text-accent-dark hover:text-primary"
              >
                View All -
              </Link>
            </div>
            <GalleryGrid items={previewItems} />
          </div>
        </section>
      )}

      <DonateBanner subtitle="Your support helps us reach more women, children, and families who need it most." />
    </>
  )
}
