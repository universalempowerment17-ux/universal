import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import DonateBanner from '../components/DonateBanner'
import { fetchGalleryItems, fetchSiteSettings, sanityConfigured } from '../lib/sanity'

const interventions = [
  {
    id: 'education',
    title: 'Education & Literacy',
    summary: 'Ensuring children and youth have access to quality learning and school readiness.',
    details:
      'We provide scholarships, learning materials, after-school support, and digital literacy for children who lack access to quality education. Through community learning centres and volunteer tutors, we help students stay in school and build confident futures.',
    activities: ['Scholarships & supplies', 'After-school support', 'Digital learning access', 'Community learning centres'],
  },
  {
    id: 'health',
    title: 'Healthcare & Wellness',
    summary: 'Bringing healthcare awareness and essential services closer to underserved families.',
    details:
      'Our health initiatives include free health camps, maternal and child wellness awareness, nutrition programmes, and telemedicine support. We work with frontline workers and community volunteers to ensure families receive timely care and health education.',
    activities: ['Health camps', 'Awareness sessions', 'Maternal wellness', 'Nutrition programmes'],
  },
  {
    id: 'women',
    title: 'Women Empowerment',
    summary: 'Building skills, confidence, and financial independence for women in marginalized communities.',
    details:
      'Inspired by proven grassroots models, our women empowerment programme reaches socially excluded women with training in entrepreneurship, financial literacy, and leadership. We engage men and boys as allies to build a gender-equal society.',
    activities: ['Entrepreneurship training', 'Self-help groups', 'Financial literacy', 'Leadership workshops'],
  },
  {
    id: 'livelihood',
    title: 'Livelihood Development',
    summary: 'Equipping communities with skills and resources for sustainable household incomes.',
    details:
      'We provide vocational training, micro-enterprise support, and mentorship from industry experts. Women and youth learn business management, marketing, and financial planning, enabling them to scale small ventures into sustainable livelihoods.',
    activities: ['Skill development', 'Micro-enterprise setup', 'Business mentorship', 'Market linkages'],
  },
  {
    id: 'digital',
    title: 'Digital Financial Literacy',
    summary: 'Empowering communities to navigate the digital financial landscape safely and confidently.',
    details:
      'This initiative provides education on online banking, mobile payments, budgeting tools, and safe digital transactions. Participants gain the skills to manage finances, access services, and make informed decisions through digital platforms.',
    activities: ['Online banking basics', 'Mobile payment training', 'Safe transaction practices', 'Budgeting tools'],
  },
  {
    id: 'community',
    title: 'Community Outreach',
    summary: 'Grassroots change agents who educate, mobilize, and sustain development at the village level.',
    details:
      'Our community outreach relies on trained volunteers, peer educators, and health champions identified from within communities. They spread awareness, lead local initiatives, and ensure programmes leave a positive, lasting impact on individuals and society.',
    activities: ['Peer educators', 'Community health volunteers', 'Awareness drives', 'Local leadership training'],
  },
]

export default function Mission() {
  const [active, setActive] = useState(interventions[0].id)
  const [siteSettings, setSiteSettings] = useState(null)
  const [galleryItems, setGalleryItems] = useState([])
  const current = interventions.find((item) => item.id === active)

  useEffect(() => {
    if (!sanityConfigured) return
    Promise.all([fetchSiteSettings(), fetchGalleryItems()]).then(([settings, items]) => {
      setSiteSettings(settings)
      setGalleryItems(items)
    })
  }, [])

  const fallbackHeroImage =
    siteSettings?.missionHeroImage ||
    galleryItems.find((item) => item.mediaType === 'image')?.image ||
    '/ngo-outreach.jpg'

  return (
    <>
      <Hero
        title="Our Mission & Interventions"
        subtitle="Creating pathways to dignity, opportunity, and self-reliance through community-led programmes."
        showCta={false}
        compact
        image={fallbackHeroImage}
        imageAlt="Fieldwork and community engagement"
      />

      <section className="section-pad mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Mission</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              To empower underserved communities through education, healthcare, livelihood, and women
              empowerment programmes, fostering self-reliance and lasting positive change.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">Vision</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              A society where every individual, especially women and marginalized communities, has
              equal rights, opportunities, and access to resources to build a dignified future.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Approach</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              We listen first, partner with local leaders and government institutions, and design
              programmes communities own and sustain because real empowerment comes from within.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            label="Programmes"
            title="Our Interventions"
            description="Each intervention addresses a specific community need while contributing to our broader goal of sustainable empowerment."
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
              <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
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
