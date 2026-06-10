import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import DonateBanner from '../components/DonateBanner'
import { fetchSiteSettings, sanityConfigured } from '../lib/sanity'

const interventions = [
  {
    id: 'education',
    title: 'Education Support',
    summary: 'Free and supportive education for underprivileged children to help them build a better future.',
    details:
      'We provide learning support, school readiness help, and practical educational guidance for children who need a stronger start. Our aim is to create a safe and encouraging space where children can learn with confidence.',
    activities: ['Learning support', 'School readiness help', 'Study materials', 'Confidence building'],
  },
  {
    id: 'special-needs',
    title: 'Special Needs Support',
    summary: 'Guidance, counselling, and learning support for special needs children and their parents.',
    details:
      'We support children with special needs through counselling, learning assistance, and family-friendly guidance. We also work closely with parents so they feel supported in daily care and development.',
    activities: ['Learning assistance', 'Counselling support', 'Parent guidance', 'Inclusive care'],
  },
  {
    id: 'parent-counselling',
    title: 'Parent Counselling',
    summary: 'Helping parents understand their child’s needs and supporting them emotionally and practically.',
    details:
      'We help parents understand their child’s strengths, challenges, and learning needs while offering emotional and practical support. This makes care at home more confident and nurturing.',
    activities: ['Family counselling', 'Practical guidance', 'Emotional support', 'Parent awareness'],
  },
  {
    id: 'skill-development',
    title: 'Skill Development',
    summary: 'Providing creative and skill-based opportunities to help children become confident and independent.',
    details:
      'Our skill development activities help children and young people explore creativity, confidence, and independence through hands-on learning and useful life skills.',
    activities: ['Creative learning', 'Life skills', 'Hands-on activities', 'Confidence building'],
  },
  {
    id: 'community-awareness',
    title: 'Community Awareness',
    summary: 'Creating awareness about inclusion, disability rights, education, and equal opportunities.',
    details:
      'We create awareness through community sessions, parent meetings, and outreach programmes that support inclusion, disability rights, education, and equal opportunity for all.',
    activities: ['Awareness drives', 'Inclusion sessions', 'Community meetings', 'Rights education'],
  },
]

export default function OurWork() {
  const [active, setActive] = useState(interventions[0].id)
  const [siteSettings, setSiteSettings] = useState(null)
  const current = interventions.find((item) => item.id === active)

  useEffect(() => {
    if (!sanityConfigured) return
    fetchSiteSettings().then(setSiteSettings)
  }, [])

  const heroImage = siteSettings?.ourWorkHeroImage || null

  return (
    <>
      <Hero
        title="Our Work & Interventions"
        subtitle="Building inclusive support for children and families through education, special needs care, counselling, skill development, and awareness."
        showCta={false}
        compact
        image={heroImage}
        imageAlt="Fieldwork and community engagement"
      />

      <section className="section-pad mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Education Support</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Free and supportive education for underprivileged children to help them build a better future.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">Special Needs Support</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Guidance, counselling, and learning support for special needs children and their parents.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Parent Counselling</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Helping parents understand their child’s needs and supporting them emotionally and practically.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            label="Programmes"
            title="Our Interventions"
            description="Each intervention supports children and families through practical, inclusive, and compassionate work."
          />

          <div className="mt-10 flex flex-wrap gap-2">
            {interventions.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                  active === item.id
                    ? 'bg-primary text-white'
                    : 'bg-surface text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {current && (
            <div className="mt-8 grid gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <h3 className="text-xl font-bold uppercase tracking-wide text-primary">{current.title}</h3>
                <p className="mt-2 text-sm font-medium text-accent-dark">{current.summary}</p>
                <p className="mt-4 leading-relaxed text-slate-600">{current.details}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-800">Key Activities</p>
                <ul className="mt-4 space-y-3">
                  {current.activities.map((activity) => (
                    <li key={activity} className="flex gap-2 text-sm text-slate-600">
                      <span className="text-accent">*</span> {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-14 text-slate-700">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <SectionHeading
            label="Join Us"
            title="Be Part Of The Change"
            description="Whether through donations or volunteering, you can help us empower more communities across India."
            center
          />
        </div>
      </section>

      <DonateBanner title="Support Our Interventions" />
    </>
  )
}
