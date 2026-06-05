import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import GalleryGrid from '../components/GalleryGrid'
import { fetchGalleryItems, sanityConfigured } from '../lib/sanity'

export default function Gallery() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!sanityConfigured) {
      setLoading(false)
      return
    }

    fetchGalleryItems()
      .then(setItems)
      .catch(() => setError('Unable to load gallery. Please try again later.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Hero
        label="Our Work In Action"
        title="Changes That Inspire Us"
        subtitle="Photos and videos from our programmes, events, and community initiatives across India."
        showCta={false}
        compact
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {!sanityConfigured && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Sanity is not configured. Add <code className="font-mono">VITE_SANITY_PROJECT_ID</code> to your{' '}
            <code className="font-mono">.env</code> file to load gallery content.
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && <GalleryGrid items={items} />}
      </section>
    </>
  )
}
