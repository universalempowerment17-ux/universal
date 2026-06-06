import { Link } from 'react-router-dom'

export default function DonateBanner({ title = 'Donate For Community Empowerment', subtitle }) {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-14 text-slate-700">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Support the mission</p>
        <h2 className="mt-3 text-2xl font-bold uppercase tracking-wide text-primary sm:text-3xl">{title}</h2>
        {subtitle && <p className="mx-auto mt-3 max-w-2xl text-slate-600">{subtitle}</p>}
        <Link
          to="/donation"
          className="mt-8 inline-flex rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-primary-dark"
        >
          Donate Now
        </Link>
      </div>
    </section>
  )
}
