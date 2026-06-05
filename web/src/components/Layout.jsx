import Navbar from './Navbar'
import Footer from './Footer'
import UpdatePopup from './UpdatePopup'

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <UpdatePopup />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
