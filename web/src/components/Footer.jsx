import { Link } from 'react-router-dom'

const socialLinks = [
  { label: 'Facebook', handle: '@uefoundation', href: 'https://facebook.com/uefoundation' },
  { label: 'Instagram', handle: '@uefoundation', href: 'https://instagram.com/uefoundation' },
  { label: 'YouTube', handle: '@uefoundation', href: 'https://www.youtube.com/@uefoundation' },
  { label: 'LinkedIn', handle: '@uefoundation', href: 'https://www.linkedin.com/company/uefoundation' },
  { label: 'X', handle: '@uefoundation', href: 'https://x.com/uefoundation' },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-700">
      <div className="border-b border-slate-200 bg-slate-50 py-3 text-center text-sm font-bold uppercase tracking-wide text-primary">
        Empowerment For Nation Building
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-bold uppercase tracking-wide text-primary">Universal Empowerment Foundation</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Reaching out to marginalized communities through education, healthcare, livelihood,
            and women empowerment programmes.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/mission" className="hover:text-primary">Our Mission</Link></li>
            <li><Link to="/gallery" className="hover:text-primary">Gallery</Link></li>
            <li><Link to="/donation" className="hover:text-primary">Donate</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>info@uefoundation.org</li>
            <li>+91 00000 00000</li>
            <li>India</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Social Media</h4>
          <ul className="mt-3 space-y-3 text-sm text-slate-600">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-primary"
                >
                  <span className="font-medium">{social.label}</span>
                  <span className="text-slate-400">{social.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Universal Empowerment Foundation. All rights reserved.
      </div>
    </footer>
  )
}
