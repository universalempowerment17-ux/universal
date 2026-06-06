import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import DonateBanner from '../components/DonateBanner'
import { fetchGalleryItems, fetchSiteSettings, sanityConfigured } from '../lib/sanity'

const values = [
  {
    title: 'Integrity & Transparency',
    description: 'We operate with accountability, ensuring every contribution creates measurable community impact.',
  },
  {
    title: 'Compassion & Dignity',
    description: 'We serve with empathy, respecting the inherent worth of every individual we work with.',
  },
  {
    title: 'Sustainable Change',
    description: 'We build programmes that communities own and sustain, not temporary relief alone.',
  },
  {
    title: 'Inclusive Partnership',
    description: 'We engage communities, volunteers, government institutions, and partners for lasting outcomes.',
  },
]

const pillars = [
  { title: 'Education', items: ['School readiness', 'Scholarships', 'Digital learning access'] },
  { title: 'Livelihood', items: ['Skill training', 'Entrepreneurship', 'Self-help groups'] },
  { title: 'Health', items: ['Health camps', 'Nutrition awareness', 'Maternal wellness'] },
  { title: 'Women Empowerment', items: ['Financial literacy', 'Leadership training', 'Gender equality'] },
]

export default function About() {
  const [siteSettings, setSiteSettings] = useState(null)
  const [galleryItems, setGalleryItems] = useState([])

  useEffect(() => {
    if (!sanityConfigured) return
    Promise.all([fetchSiteSettings(), fetchGalleryItems()]).then(([settings, items]) => {
      setSiteSettings(settings)
      setGalleryItems(items)
    })
  }, [])

  const fallbackHeroImage =
    siteSettings?.aboutHeroImage ||
    galleryItems.find((item) => item.mediaType === 'image')?.image ||
    '/ngo-group.jpg'

  return (
    <>
      <Hero
        title="About Universal Empowerment Foundation"
        subtitle="A people-driven organisation working at the grassroots to empower underserved communities across India."
        showCta={false}
        compact
        image={fallbackHeroImage}
        imageAlt="Universal Empowerment Foundation community work"
      />

      <section className="section-pad mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading label="Who We Are" title="Our Story" />
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="space-y-4 leading-relaxed text-slate-700">
            <p>
              Universal Empowerment Foundation was founded on the belief that every person deserves the
              opportunity to live with dignity, independence, and hope. What began as a small volunteer
              initiative supporting local schools has grown into a movement touching thousands of lives
              in rural and urban underserved areas.
            </p>
            <p>
              Inspired by the nation-building spirit of community-led development, we work through
              grassroots volunteers, peer educators, and community health champions, empowering people to
              seek healthcare, education, and livelihood opportunities on their own terms.
            </p>
            <p>
              Today, our programmes span education, healthcare, women empowerment, and livelihood
              development, always designed with communities, for communities.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-800">At A Glance</h3>
            <ul className="mt-6 space-y-4 text-sm text-slate-600">
              <li className="flex gap-3 border-b border-slate-200 pb-3">
                <span className="font-semibold text-primary">01</span>
                Registered non-profit organisation
              </li>
              <li className="flex gap-3 border-b border-slate-200 pb-3">
                <span className="font-semibold text-primary">02</span>
                Active in rural and urban underserved communities
              </li>
              <li className="flex gap-3 border-b border-slate-200 pb-3">
                <span className="font-semibold text-primary">03</span>
                Volunteer-driven with professional partnerships
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary">04</span>
                Focus on education, health, livelihood, and women empowerment
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            label="Focus Areas"
            title="Supplementing Community Development"
            description="Our work aligns with national priorities in education, livelihood, health, and women empowerment, strengthening communities from within."
            center
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="rounded-[1.25rem] border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wide text-primary">{pillar.title}</h3>
                <ul className="mt-3 space-y-2">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-600">
                      <span className="text-accent">-</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading label="Principles" title="Our Values" center />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {values.map((value) => (
            <div key={value.title} className="rounded-[1.25rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold uppercase tracking-wide text-primary">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{value.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/mission"
            className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-accent-dark"
          >
            Explore Our Mission
          </Link>
        </div>
      </section>

      <DonateBanner />
    </>
  )
}
