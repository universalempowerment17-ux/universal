import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import InquiryForm from '../components/InquiryForm'
import { fetchSiteSettings, sanityConfigured } from '../lib/sanity'

const contactCards = [
  {
    label: 'Phone',
    value: '80763 53179',
    actionLabel: 'Call Now',
    href: 'tel:+918076353179',
  },
  {
    label: 'Email',
    value: 'universalempowerment17@gmail.com',
    actionLabel: 'Send Email',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=universalempowerment17@gmail.com&su=Enquiry%20from%20UEF%20website&body=Hello%20Universal%20Empowerment%20Foundation%2C%0A%0AI%20would%20like%20to%20connect%20with%20you.',
  },
  {
    label: 'Address',
    value: 'D-100, Block D, Sector 55, Noida, Uttar Pradesh 201307',
    actionLabel: 'View Address',
    href: 'https://share.google/Ruq1iFhZ7GAv00VuF',
  },
  {
    label: 'Contact Details',
    value: 'Fill the form and send your message directly to our WhatsApp admin.',
    actionLabel: 'Send you message',
  },
]

export default function Contact() {
  const [siteSettings, setSiteSettings] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (!sanityConfigured) return
    fetchSiteSettings().then(setSiteSettings)
  }, [])

  return (
    <>
      <Hero
        label="Contact Us"
        title="Universal Empowerment Foundation"
        subtitle="Noida / Delhi NCR"
        showCta={false}
        compact
        image={siteSettings?.contactHeroImage}
        imageAlt="Community members reaching out"
      />

      <section className="section-pad bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="uef-contact-panel rounded-4xl border border-slate-200 p-6 text-white shadow-[0_18px_45px_rgba(15,23,42,0.12)] sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">Reach Out</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight">Let&apos;s connect with UEF</h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80">
                Use the contact details below for a quick connection, or open the form when you want to
                send your message.
              </p>

              <div className="mt-8 space-y-4">
                {contactCards.map((card) => (
                  <div key={card.label} className="rounded-3xl bg-white/10 p-4 backdrop-blur-sm">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white/60">
                      {card.label}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white">{card.value}</p>
                    {card.href ? (
                      <a
                        href={card.href}
                        className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-slate-100"
                      >
                        {card.actionLabel}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowForm(true)}
                        className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-slate-100"
                      >
                        {card.actionLabel}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)] sm:p-8">
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary-dark">Message Us</p>
                <h2 className="mt-3 text-2xl font-bold text-slate-900">Contact Form</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                  Click “Send you message” to open the form and send your details directly to WhatsApp.
                </p>
              </div>

              {!showForm ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                  <p className="text-sm text-slate-600">The form is hidden until you click the button.</p>
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                  >
                    Send you message
                  </button>
                </div>
              ) : (
                <InquiryForm
                  mode="contact"
                  title=""
                  subtitle=""
                  submitLabel="Submit"
                  variant="contact"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
