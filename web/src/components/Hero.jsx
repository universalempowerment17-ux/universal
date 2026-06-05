import { Link } from 'react-router-dom'

export default function Hero({
  label = 'Universal Empowerment Foundation',
  title,
  subtitle,
  showCta = true,
  compact = false,
  imageStyle = false,
}) {
  return (
    <section
      className={`relative overflow-hidden text-white ${
        imageStyle
          ? 'bg-primary'
          : 'bg-gradient-to-br from-primary via-primary-dark to-slate-900'
      } ${compact ? 'py-16 sm:py-20' : 'py-20 sm:py-28'}`}
    >
      <div className="absolute inset-0 opacity-15">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-full bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {imageStyle && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(30,58,95,0.95), rgba(21,42,69,0.9)), url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80")',
          }}
        />
      )}

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent sm:text-sm">{label}</p>
        <h1 className="mt-3 max-w-4xl text-3xl font-bold uppercase leading-tight tracking-wide sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">{subtitle}</p>
        )}
        {showCta && (
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/donation"
              className="rounded bg-accent px-7 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-accent-dark"
            >
              Donate Now
            </Link>
            <Link
              to="/mission"
              className="rounded border-2 border-white/40 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              Our Interventions
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
