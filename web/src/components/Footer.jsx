import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="border-b border-white/10 bg-accent py-3 text-center text-sm font-bold uppercase tracking-wide">
        Empowerment For Nation Building
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold uppercase tracking-wide">Universal Empowerment Foundation</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Reaching out to marginalized communities through education, healthcare, livelihood,
            and women empowerment programmes.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/mission" className="hover:text-white">Our Mission</Link></li>
            <li><Link to="/gallery" className="hover:text-white">Gallery</Link></li>
            <li><Link to="/donation" className="hover:text-white">Donate</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>info@uefoundation.org</li>
            <li>+91 00000 00000</li>
            <li>India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} Universal Empowerment Foundation. All rights reserved.
      </div>
    </footer>
  )
}
