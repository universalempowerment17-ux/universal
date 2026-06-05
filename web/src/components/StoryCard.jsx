import { useState } from 'react'

export default function StoryCard({ name, location, excerpt, story }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:shadow-md">
      <div className="bg-gradient-to-br from-primary to-primary-dark px-6 py-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">{location}</p>
        <h3 className="mt-1 text-lg font-bold">{name}</h3>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-relaxed text-slate-600">
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
