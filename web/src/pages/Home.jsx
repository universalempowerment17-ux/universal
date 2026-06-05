import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import StoryCard from '../components/StoryCard'
import DonateBanner from '../components/DonateBanner'
import GalleryGrid from '../components/GalleryGrid'
import { fetchGalleryItems, sanityConfigured } from '../lib/sanity'

const impactStats = [
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

const stories = [
  {
    name: 'Priya Sharma',
    location: 'Rajasthan',
    excerpt:
      'After losing her tailoring job during the pandemic, Priya struggled to support her family. Through UEF\'s skill programme, she learned advanced stitching and received a sewing machine...',
    story:
      'After losing her tailoring job during the pandemic, Priya struggled to support her family. Through UEF\'s skill programme, she learned advanced stitching and received a sewing machine. Today she runs a home-based tailoring unit, employs two women from her neighbourhood, and sends her daughter back to school. Priya now mentors other women in her community, helping them become self-reliant.',
  },
  {
    name: 'Lakshmi Devi',
    location: 'Karnataka',
    excerpt:
      'Lakshmi was a homemaker with no formal income when her husband\'s daily wages became irregular. She joined our entrepreneurship training and started a small organic products venture...',
    story:
      'Lakshmi was a homemaker with no formal income when her husband\'s daily wages became irregular. She joined our entrepreneurship training and started a small organic products venture with women from her slum. Together they make natural soaps and wellness products. Her group is now registered as a self-help collective, and Lakshmi leads weekly sessions for new members.',
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
  const [previewItems, setPreviewItems] = useState([])

  useEffect(() => {
    if (!sanityConfigured) return
    fetchGalleryItems().then((items) => setPreviewItems(items.slice(0, 3)))
  }, [])

  return (
    <>
      <Hero
        imageStyle
        title="Empowerment For Nation Building"
        subtitle="Universal Empowerment Foundation reaches out to marginalized communities — focusing on education, healthcare, livelihood, and women empowerment for a sustainable future."
      />

      {/* Why Empowerment */}
      <section className="section-pad mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Our Belief"
          title="Why Empowerment?"
        />
        <div className="mt-8 space-y-4 text-slate-600 leading-relaxed">
          <p>
            Over the past decade, equality and access to opportunity have emerged as critical factors
            for the health, social progress, and economic advancement of nations. Promoting empowerment
            — especially for women and underserved communities — is central to building a fair and
            sustainable society.
          </p>
          <p>
            When communities are empowered, they contribute actively to economic growth, education,
            healthcare, and decision-making at every level. Empowered individuals take leadership roles,
            their skills are recognized, and their potential is fully realized — creating a more
            inclusive world where every voice matters.
          </p>
          <p className="font-medium text-primary">
            Ultimately, empowerment is essential for building a fairer, more harmonious society for everyone.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            label="Our Work"
            title="What We Do?"
            description="UEF reaches out to marginalized and socially excluded communities. We focus on interventions in education, healthcare, livelihood, and women empowerment — capacitating people through innovative community practices so they can seek opportunity and bring sustainable change."
          />
          <p className="mt-6 max-w-3xl text-slate-600 leading-relaxed">
            We support communities to become aware, skilled, and financially independent. Our programmes
            actively work toward a gender-equal society, engaging men, women, and youth in the process
            of lasting empowerment.
          </p>
          <Link
            to="/about"
            className="mt-6 inline-flex text-sm font-bold uppercase tracking-wide text-accent-dark hover:text-primary"
          >
            Learn About Us →
          </Link>
        </div>
      </section>

      {/* Interventions */}
      <section className="section-pad mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading label="Programmes" title="Our Interventions" center />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {interventions.map((item) => (
            <div
              key={item.title}
              className="group border-l-4 border-accent bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
            >
              <h3 className="text-sm font-bold uppercase tracking-wide text-primary group-hover:text-accent-dark">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/mission"
            className="inline-flex rounded bg-primary px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-primary-dark"
          >
            View All Programmes
          </Link>
        </div>
      </section>

      {/* Impact */}
      <section className="bg-primary py-14 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading label="Results" title="Our Impact" center light />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-accent sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-wide text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories of Change */}
      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading label="Real Lives" title="Stories Of Change" center />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {stories.map((story) => (
              <StoryCard key={story.name} {...story} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      {previewItems.length > 0 && (
        <section className="section-pad bg-surface">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <SectionHeading label="Gallery" title="Changes That Inspire Us" />
              <Link to="/gallery" className="text-sm font-bold uppercase tracking-wide text-accent-dark hover:text-primary">
                View All →
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
