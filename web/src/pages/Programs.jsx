import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import { fetchSiteSettings, sanityConfigured } from '../lib/sanity'

const programs = [
  {
    title: 'Free Education Program',
    summary: 'Supporting children from deprived sections through basic education and learning activities.',
  },
  {
    title: 'Special Needs Support Program',
    summary: 'Helping special needs children through counselling, learning support, and developmental guidance.',
  },
  {
    title: 'Parent Support & Counselling',
    summary: 'Guiding parents to understand their child’s behaviour, learning style, and emotional needs.',
  },
  {
    title: 'Skill & Creativity Program',
    summary: 'Encouraging children to learn creative skills and become more independent.',
  },
  {
    title: 'Women & Child Empowerment Program',
    summary: 'Supporting families through awareness, education, and empowerment activities.',
  },
]

export default function Programs() {
  const [siteSettings, setSiteSettings] = useState(null)

  useEffect(() => {
    if (!sanityConfigured) return
    fetchSiteSettings().then(setSiteSettings)
  }, [])

  return (
    <>
      <Hero
        label="Our Programs"
        title="Focused Programs For Lasting Change"
        subtitle="We design practical community programmes that help families build stability, confidence, and opportunity."
        showCta={false}
        compact
        image={siteSettings?.programsHeroImage}
        imageAlt="Community programs by Universal Empowerment Foundation"
      />

      <section className="section-pad mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="What We Do"
          title="Our Programs"
          description="These programs focus on education, inclusion, support, and empowerment for children and families."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {programs.map((program) => (
            <article
              key={program.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-primary">{program.title}</h3>
              <p className="mt-3 leading-relaxed text-slate-700">{program.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
