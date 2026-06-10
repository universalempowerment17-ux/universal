import { useEffect, useMemo, useState } from 'react'
import { urlFor } from '../lib/sanity'
import { getYouTubeEmbedUrl, getYouTubeThumbnail } from '../lib/youtube'

const COLLAPSED_COUNT = 6

function MediaModal({ item, onClose, onPrevious, onNext, canPrevious, canNext }) {
  if (!item) return null

  const isVideo = item.mediaType === 'video'
  const embedUrl = isVideo ? getYouTubeEmbedUrl(item.youtubeUrl) : null
  const imageUrl = !isVideo && item.image ? urlFor(item.image).width(1400).format('webp').url() : null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {canPrevious && (
          <button
            type="button"
            onClick={onPrevious}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 px-3 py-3 text-slate-800 shadow-lg transition hover:bg-white"
            aria-label="Previous item"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {canNext && (
          <button
            type="button"
            onClick={onNext}
            className="absolute right-12 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 px-3 py-3 text-slate-800 shadow-lg transition hover:bg-white"
            aria-label="Next item"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {isVideo && embedUrl ? (
          <div className="aspect-video w-full">
            <iframe
              src={`${embedUrl}?autoplay=1`}
              title="Gallery video"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : imageUrl ? (
          <img src={imageUrl} alt="Gallery item" className="max-h-[85vh] w-full object-contain" />
        ) : (
          <div className="flex aspect-video items-center justify-center bg-slate-900 text-white">
            No preview
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
      ? urlFor(item.image).width(700).height(525).fit('crop').format('webp').url()
      : null

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
    >
      {thumb ? (
        <img
          src={thumb}
          alt=""
          className="aspect-[4/3] w-full object-cover transition group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center bg-slate-50 text-slate-400">
          No preview
        </div>
      )}

      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-lg">
            <svg className="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      <div className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
        {isVideo ? 'Video' : 'Photo'}
      </div>
    </button>
  )
}

function GallerySection({ title, description, items, emptyMessage }) {
  const [expanded, setExpanded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    if (activeIndex != null && activeIndex >= items.length) {
      setActiveIndex(items.length ? 0 : null)
    }
  }, [activeIndex, items.length])

  const visibleItems = useMemo(() => {
    return expanded ? items : items.slice(0, COLLAPSED_COUNT)
  }, [expanded, items])

  const activeItem = activeIndex != null ? items[activeIndex] : null

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
        <p className="text-lg font-semibold text-slate-700">{title}</p>
        <p className="mt-2 text-sm text-slate-500">{emptyMessage}</p>
      </div>
    )
  }

  const canExpand = items.length > COLLAPSED_COUNT
  const canPrevious = activeIndex != null && activeIndex > 0
  const canNext = activeIndex != null && activeIndex < items.length - 1

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">{description}</p>
        </div>
      </div>

      {expanded ? (
        <div className="max-h-[78vh] overflow-y-auto pr-1">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item, index) => (
              <GalleryCard key={item._id} item={item} onOpen={() => setActiveIndex(index)} />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item, index) => (
            <GalleryCard key={item._id} item={item} onOpen={() => setActiveIndex(index)} />
          ))}
        </div>
      )}

      {expanded && canExpand && (
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
          <span>Showing all {items.length} items</span>
          <span>Use See less to return to the compact view.</span>
        </div>
      )}

      {canExpand && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark"
          >
            {expanded ? 'See less' : 'See more'}
          </button>
        </div>
      )}

      <MediaModal
        item={activeItem}
        onClose={() => setActiveIndex(null)}
        onPrevious={() => setActiveIndex((current) => Math.max(0, current - 1))}
        onNext={() => setActiveIndex((current) => Math.min(items.length - 1, current + 1))}
        canPrevious={canPrevious}
        canNext={canNext}
      />
    </section>
  )
}

export default function GalleryGrid({ items = [] }) {
  const photos = items.filter((item) => item.mediaType === 'image')
  const videos = items.filter((item) => item.mediaType === 'video')

  return (
    <div className="space-y-14">
      <GallerySection
        title="Photo Gallery"
        description="Newest photos appear first. Open any image to move through the gallery with next and previous."
        items={photos}
        emptyMessage="Add photo entries in Sanity Studio to display them here."
      />

      <GallerySection
        title="Video Gallery"
        description="Newest videos appear first. Open any video to move through the gallery with next and previous."
        items={videos}
        emptyMessage="Add video entries with YouTube links in Sanity Studio to display them here."
      />
    </div>
  )
}
