import { Link } from 'react-router-dom'

export default function DonateBanner({ title = 'Donate For Community Empowerment', subtitle }) {
  return (
    <section className="bg-gradient-to-r from-accent to-accent-dark py-14 text-white">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-bold uppercase tracking-wide sm:text-3xl">{title}</h2>
        {subtitle && <p className="mx-auto mt-3 max-w-2xl text-white/90">{subtitle}</p>}
        <Link
          to="/donation"
          className="mt-8 inline-flex rounded-lg bg-white px-8 py-3 text-sm font-bold uppercase tracking-wide text-accent-dark shadow-lg transition hover:bg-slate-50"
        >
          Donate Now
        </Link>
      </div>
    </section>
  )
}
