import { Link } from 'react-router-dom'

const socialLinks = [
  { label: 'Facebook', handle: '@UefFamily', href: 'https://www.facebook.com/UefFamily/' },
  { label: 'Instagram', handle: '@uefoundation', href: 'https://instagram.com/uefoundation' },
  { label: 'YouTube', handle: '@universalempowermentfounda4684', href: 'https://www.youtube.com/@universalempowermentfounda4684' },
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
            Empowering children, families, and communities through education, inclusion, and care.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/programs" className="hover:text-primary">Programs</Link></li>
            <li><Link to="/donation" className="hover:text-primary">Donate</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=universalempowerment17@gmail.com&su=Enquiry%20from%20UEF%20website&body=Hello%20Universal%20Empowerment%20Foundation%2C%0A%0AI%20would%20like%20to%20connect%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                universalempowerment17@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+918076353179" className="hover:text-primary">
                +91 80763 53179
              </a>
            </li>
            <li>
              <a
                href="https://share.google/Ruq1iFhZ7GAv00VuF"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                D-100, Block D, Sector 55, Noida, Uttar Pradesh 201307
              </a>
            </li>
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
                  rel="noopener noreferrer"
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
