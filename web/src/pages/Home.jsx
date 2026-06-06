import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import StoryCard from '../components/StoryCard'
import DonateBanner from '../components/DonateBanner'
import GalleryGrid from '../components/GalleryGrid'
import { fetchGalleryItems, fetchSiteSettings, fetchStoryItems, sanityConfigured, urlFor } from '../lib/sanity'

const defaultImpactStats = [
  { value: '10,000+', label: 'Lives Touched' },
  { value: '30+', label: 'Community Programs' },
  { value: '500+', label: 'Women Trained' },
  { value: '15', label: 'Partner Villages' },
]

const interventions = [
  {
    title: 'Education & Literacy',
    description: 'Scholarships, learning support, and school readiness for children in underserved communities.',
  },
  {
    title: 'Healthcare & Wellness',
    description: 'Health camps, maternal care awareness, and nutrition support for families in need.',
  },
  {
    title: 'Women Empowerment',
    description: 'Skill training, self-help groups, and entrepreneurship support for financial independence.',
  },
  {
    title: 'Digital & Financial Literacy',
    description: 'Training women and youth to navigate digital tools, banking, and safe online transactions.',
  },
  {
    title: 'Livelihood Development',
    description: 'Vocational skills and micro-enterprise guidance to build sustainable household incomes.',
  },
  {
    title: 'Community Outreach',
    description: 'Grassroots volunteers who educate, mobilize, and sustain change at the village level.',
  },
]

const defaultStories = [
  {
    name: 'Priya Sharma',
    location: 'Rajasthan',
    excerpt:
      "After losing her tailoring job during the pandemic, Priya struggled to support her family. Through UEF's skill programme, she learned advanced stitching and received a sewing machine...",
    story:
      "After losing her tailoring job during the pandemic, Priya struggled to support her family. Through UEF's skill programme, she learned advanced stitching and received a sewing machine. Today she runs a home-based tailoring unit, employs two women from her neighbourhood, and sends her daughter back to school. Priya now mentors other women in her community, helping them become self-reliant.",
  },
  {
    name: 'Lakshmi Devi',
    location: 'Karnataka',
    excerpt:
      "Lakshmi was a homemaker with no formal income when her husband's daily wages became irregular. She joined our entrepreneurship training and started a small organic products venture...",
    story:
      "Lakshmi was a homemaker with no formal income when her husband's daily wages became irregular. She joined our entrepreneurship training and started a small organic products venture with women from her slum. Together they make natural soaps and wellness products. Her group is now registered as a self-help collective, and Lakshmi leads weekly sessions for new members.",
  },
  {
    name: 'Meena Patel',
    location: 'Maharashtra',
    excerpt:
      'Meena worked as a daily wage labourer and could barely feed her family of five. She began vegetable cultivation with UEF support and mobilized women in her village...',
    story:
      'Meena worked as a daily wage labourer and could barely feed her family of five. She began vegetable cultivation with UEF support and mobilized women in her village to form a cooperative. Their kitchen garden initiative now supplies fresh produce to local markets and feeds their families nutritiously. Meena is a community change-maker who inspires others to take charge of their futures.',
  },
]

export default function Home() {
  const [galleryItems, setGalleryItems] = useState([])
  const [previewItems, setPreviewItems] = useState([])
  const [siteSettings, setSiteSettings] = useState(null)
  const [storyItems, setStoryItems] = useState([])
  const [slidesPerView, setSlidesPerView] = useState(1)
  const [activeStoryIndex, setActiveStoryIndex] = useState(0)
  const impactStats = useMemo(() => {
    const configuredStats = (siteSettings?.impactStats || [])
      .filter((stat) => stat?.value && stat?.label)
      .map((stat) => ({
        value: stat.value,
        label: stat.label,
      }))

    return configuredStats.length > 0 ? configuredStats : defaultImpactStats
  }, [siteSettings])

  const demoSlides = useMemo(
    () => [
      { src: '/ngo-children.jpg', alt: 'Children smiling and raising hands', label: 'Children support' },
      { src: '/ngo-outreach.jpg', alt: 'Community outreach and assistance', label: 'Community outreach' },
      { src: '/ngo-group.jpg', alt: 'Group of children with support staff', label: 'Education support' },
      { src: '/ngo-women.jpg', alt: 'Women empowerment and training', label: 'Women empowerment' },
    ],
    []
  )

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
    const fromSettings = (siteSettings?.homeHeroImages || []).map((image, index) => ({
      image,
      label: `Homepage slide ${index + 1}`,
      alt: `Homepage slide ${index + 1}`,
    }))

    const fromGallery = galleryItems
      .filter((item) => item.mediaType === 'image' && item.image)
      .slice(0, 4)
      .map((item) => ({
        image: item.image,
        label: item.title || item.caption || 'Community story',
        alt: item.title || item.caption || 'Community story',
      }))

    return [...fromSettings, ...demoSlides, ...fromGallery].slice(0, 4)
  }, [siteSettings, galleryItems, demoSlides])

  const firstGalleryImage = galleryItems.find((item) => item.mediaType === 'image' && item.image)

  const featureImageUrl = siteSettings?.homeFeatureImage
    ? urlFor(siteSettings.homeFeatureImage)?.width(1200).height(1400).url()
    : firstGalleryImage
      ? urlFor(firstGalleryImage.image)?.width(1200).height(1400).url()
    : '/ngo-children.jpg'

  const founderImageUrl = siteSettings?.founderImage
    ? urlFor(siteSettings.founderImage)?.width(1200).height(1400).url()
    : '/founder.jpg'

  const stories = storyItems.length > 0 ? storyItems : defaultStories
  const carouselStories = stories.length > 3 ? stories : stories.slice(0, 3)
  const shouldAutoRotateStories = stories.length > 3
  const maxStoryIndex = Math.max(carouselStories.length - slidesPerView, 0)
  const visibleStoryIndex = Math.min(activeStoryIndex, maxStoryIndex)

  return (
    <>
      <Hero
        title="Empowerment For Nation Building"
        subtitle="Universal Empowerment Foundation reaches out to marginalized communities, focusing on education, healthcare, livelihood, and women empowerment for a sustainable future."
        images={heroSlides}
        imageAlt="Community empowerment work by Universal Empowerment Foundation"
        stats={impactStats}
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

          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
            {featureImageUrl ? (
              <img
                src={featureImageUrl}
                alt="Community work"
                className="h-[420px] w-full rounded-[1.5rem] object-cover sm:h-[520px]"
              />
            ) : (
              <div className="flex h-[420px] items-end rounded-[1.5rem] bg-slate-50 p-6 text-slate-700 sm:h-[520px]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary-dark">Community stories</p>
                  <h3 className="mt-3 text-2xl font-bold text-slate-800">Photography from the field</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
                    Add a featured community image in Sanity to replace this placeholder.
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
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
              <img
                src={founderImageUrl}
                alt="Founder portrait"
                className="h-[420px] w-full rounded-[1.5rem] object-cover sm:h-[520px]"
              />
            </div>
            <div>
              <SectionHeading label="Founder" title="Message From The Founder" />
              <div className="mt-8 space-y-4 leading-relaxed text-slate-700">
                <p>
                  Universal Empowerment Foundation is built on the belief that service should be close to
                  people and rooted in dignity. Every programme starts by listening to the community and
                  responding to what matters most in daily life.
                </p>
                <p>
                  The vision is simple: create pathways where women, children, and families can grow with
                  confidence, earn with independence, and participate fully in society.
                </p>
                <p className="rounded-[1.5rem] border-l-4 border-accent bg-surface p-5 text-slate-700">
                  This section can be updated from Sanity by changing the founder image in Site Settings.
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
            description="UEF reaches out to marginalized and socially excluded communities through education, healthcare, livelihood, and women empowerment programmes that build long-term change."
          />
          <p className="mt-6 max-w-3xl leading-relaxed text-slate-700">
            We support communities to become aware, skilled, and financially independent. Our programmes
            actively work toward a gender-equal society, engaging men, women, and youth in the process
            of lasting empowerment.
          </p>
          <Link
            to="/about"
            className="mt-6 inline-flex text-sm font-bold uppercase tracking-wide text-accent-dark hover:text-primary"
          >
            Learn About Us -
          </Link>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading label="Programmes" title="Our Interventions" center />
        <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {interventions.map((item) => (
            <div
              key={item.title}
              className="group flex h-full flex-col rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(15,23,42,0.08)]"
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
            to="/mission"
            className="inline-flex rounded-full bg-primary px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-primary-dark"
          >
            View All Programmes
          </Link>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-14 text-slate-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading label="Results" title="Our Impact" center />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-wide text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading label="Real Lives" title="Stories Of Change" center />
          {shouldAutoRotateStories ? (
            <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-2 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
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
