import { useState } from 'react'
import { urlFor } from '../lib/sanity'
import { getYouTubeEmbedUrl, getYouTubeThumbnail } from '../lib/youtube'

function MediaModal({ item, onClose }) {
  if (!item) return null

  const isVideo = item.mediaType === 'video'
  const embedUrl = isVideo ? getYouTubeEmbedUrl(item.youtubeUrl) : null
  const imageUrl = !isVideo && item.image ? urlFor(item.image).width(1200).url() : null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isVideo && embedUrl ? (
          <div className="aspect-video w-full">
            <iframe
              src={`${embedUrl}?autoplay=1`}
              title={item.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : imageUrl ? (
          <img src={imageUrl} alt={item.title} className="max-h-[80vh] w-full object-contain" />
        ) : null}

        {(item.title || item.caption) && (
          <div className="bg-slate-900 px-4 py-3 text-white">
            {item.title && <p className="font-semibold">{item.title}</p>}
            {item.caption && <p className="mt-1 text-sm text-slate-300">{item.caption}</p>}
          </div>
        )}
      </div>
    </div>
  )
}

function GalleryCard({ item, onOpen }) {
  const isVideo = item.mediaType === 'video'
  const thumb = isVideo
    ? getYouTubeThumbnail(item.youtubeUrl)
    : item.image
      ? urlFor(item.image).width(600).height(400).fit('crop').url()
      : null

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group relative overflow-hidden rounded-xl bg-slate-200 text-left shadow-sm transition hover:shadow-md"
    >
      {thumb ? (
        <img
          src={thumb}
          alt={item.title}
          className="aspect-[4/3] w-full object-cover transition group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center bg-slate-200 text-slate-400">
          No preview
        </div>
      )}

      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg">
            <svg className="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      <div className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
        {isVideo ? 'Video' : 'Photo'}
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
        <p className="truncate text-sm font-medium text-white">{item.title}</p>
      </div>
    </button>
  )
}

export default function GalleryGrid({ items, filter = 'all' }) {
  const [active, setActive] = useState(null)
  const [activeFilter, setActiveFilter] = useState(filter)

  const filtered = items.filter((item) => {
    if (activeFilter === 'all') return true
    return item.mediaType === activeFilter
  })

  if (!items.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <p className="text-lg font-medium text-slate-600">No gallery items yet</p>
        <p className="mt-2 text-sm text-slate-500">
          Add photos in Sanity Studio or paste YouTube links for videos.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'image', label: 'Photos' },
          { key: 'video', label: 'Videos' },
        ].map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActiveFilter(f.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              activeFilter === f.key
                ? 'bg-primary text-white'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <GalleryCard key={item._id} item={item} onOpen={setActive} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-8 text-center text-slate-500">No items match this filter.</p>
      )}

      <MediaModal item={active} onClose={() => setActive(null)} />
    </>
  )
}
