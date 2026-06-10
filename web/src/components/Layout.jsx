import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import UpdatePopup from './UpdatePopup'

export default function Layout({ children }) {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <UpdatePopup />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
