import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import { fetchDonationSettings, fetchGalleryItems, fetchSiteSettings, sanityConfigured, urlFor } from '../lib/sanity'

export default function Donation() {
  const [settings, setSettings] = useState(null)
  const [siteSettings, setSiteSettings] = useState(null)
  const [galleryItems, setGalleryItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('qr')

  useEffect(() => {
    if (!sanityConfigured) {
      setLoading(false)
      return
    }

    Promise.all([fetchDonationSettings(), fetchSiteSettings(), fetchGalleryItems()])
      .then(([donationSettings, settings, items]) => {
        setSettings(donationSettings)
        setSiteSettings(settings)
        setGalleryItems(items)
      })
      .finally(() => setLoading(false))
  }, [])

  const qrUrl = settings?.qrCodeImage ? urlFor(settings.qrCodeImage).width(400).url() : null
  const fallbackHeroImage =
    siteSettings?.donationHeroImage ||
    galleryItems.find((item) => item.mediaType === 'image')?.image ||
    '/ngo-women.jpg'

  const bankFields = [
    { label: 'Account Name', value: settings?.accountName },
    { label: 'Bank Name', value: settings?.bankName },
    { label: 'Account Number', value: settings?.accountNumber },
    { label: 'IFSC Code', value: settings?.ifscCode },
    { label: 'Branch', value: settings?.branch },
    { label: 'UPI ID', value: settings?.upiId },
  ]

  return (
    <>
      <Hero
        label="Support Our Cause"
        title="Donate For Empowerment"
        subtitle="Your generosity fuels our programmes. Choose a convenient way to contribute and help build stronger communities."
        showCta={false}
        compact
        image={fallbackHeroImage}
        imageAlt="Donation and support work"
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        {!sanityConfigured && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Sanity is not configured. Donation details will appear once you connect your Sanity project.
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex border-b border-slate-200">
              {[
                { key: 'qr', label: 'Scan QR Code' },
                { key: 'bank', label: 'Bank Transfer' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 px-4 py-4 text-sm font-semibold transition ${
                    activeTab === tab.key
                      ? 'border-b-2 border-primary bg-primary/5 text-primary'
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6 sm:p-8">
              {activeTab === 'qr' && (
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-primary">Pay via QR Code</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Scan the QR code below using any UPI app to make your donation.
                  </p>

                  {qrUrl ? (
                    <div className="mx-auto mt-6 inline-block rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <img src={qrUrl} alt="Donation QR Code" className="h-64 w-64 object-contain" />
                    </div>
                  ) : (
                    <div className="mx-auto mt-6 flex h-64 w-64 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-sm text-slate-400">
                      QR code not uploaded yet
                    </div>
                  )}

                  {settings?.upiId && (
                    <p className="mt-4 text-sm text-slate-600">
                      UPI ID: <span className="font-mono font-semibold text-primary">{settings.upiId}</span>
                    </p>
                  )}
                </div>
              )}

              {activeTab === 'bank' && (
                <div>
                  <h2 className="text-xl font-semibold text-primary">Bank Transfer Details</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Transfer your donation directly to our bank account using the details below.
                  </p>

                  <dl className="mt-6 space-y-4">
                    {bankFields.map(
                      (field) =>
                        field.value && (
                          <div
                            key={field.label}
                            className="flex flex-col gap-1 rounded-xl bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <dt className="text-sm font-medium text-slate-500">{field.label}</dt>
                            <dd className="font-mono text-sm font-semibold text-primary">{field.value}</dd>
                          </div>
                        )
                    )}
                  </dl>

                  {!bankFields.some((field) => field.value) && (
                    <p className="mt-6 text-center text-sm text-slate-400">
                      Bank details not added yet. Update them in Sanity Studio.
                    </p>
                  )}
                </div>
              )}

              {settings?.donationNote && (
                <div className="mt-6 rounded-xl bg-accent/10 px-4 py-3 text-sm text-slate-700">
                  {settings.donationNote}
                </div>
              )}
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-slate-500">
          Thank you for supporting Universal Empowerment Foundation. Every contribution makes a difference.
        </p>
      </section>
    </>
  )
}
