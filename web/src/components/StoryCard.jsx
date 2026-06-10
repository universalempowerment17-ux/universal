import { useState } from 'react'
import { urlFor } from '../lib/sanity'

export default function StoryCard({ name, location, image, excerpt, story }) {
  const [expanded, setExpanded] = useState(false)
  const imageUrl = image ? urlFor(image)?.width(900).height(600).fit('crop').format('webp').url() : null

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)]">
      {imageUrl ? (
        <div className="overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="h-52 w-full object-cover transition duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : null}
      <div className="border-b border-slate-100 bg-slate-50 px-6 py-5 text-slate-700">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{location}</p>
        <h3 className="mt-1 text-lg font-bold text-primary">{name}</h3>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-relaxed text-slate-700">
          {expanded ? story : excerpt}
        </p>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 self-start text-sm font-bold uppercase tracking-wide text-accent-dark hover:text-primary"
        >
          {expanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </article>
  )
}
