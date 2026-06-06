export default function SectionHeading({ label, title, description, center = false, light = false }) {
  return (
    <div className={center ? 'text-center' : ''}>
      {label && (
        <p
          className={`text-[0.72rem] font-semibold uppercase tracking-[0.16em] ${
            light ? 'text-accent' : 'text-accent-dark'
          }`}
        >
          {label}
        </p>
      )}
      <h2
        className={`mt-2 text-2xl font-bold tracking-tight sm:text-3xl ${
          light ? 'text-white' : 'text-primary'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-3xl text-base leading-relaxed ${
            center ? 'mx-auto' : ''
          } ${light ? 'text-slate-300' : 'text-slate-600'}`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
