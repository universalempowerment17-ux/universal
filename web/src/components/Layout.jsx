import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import UpdatePopup from './UpdatePopup'
import { fetchGalleryItems, fetchSiteSettings, sanityConfigured, urlFor } from '../lib/sanity'

function loadImage(src) {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null)
      return
    }

    const image = new Image()
    image.onload = () => resolve(src)
    image.onerror = () => resolve(null)
    image.src = src
  })
}

export default function Layout({ children }) {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    async function preload() {
      if (!sanityConfigured) {
        return
      }

      try {
        const [siteSettings, galleryItems] = await Promise.all([fetchSiteSettings(), fetchGalleryItems()])

        const sources = [
          ...(siteSettings?.homeHeroImages || []).map((image) => urlFor(image)?.width(1800).url()).filter(Boolean),
          siteSettings?.homeBeliefImage ? urlFor(siteSettings.homeBeliefImage)?.width(1200).height(1400).url() : null,
          siteSettings?.founderImage ? urlFor(siteSettings.founderImage)?.width(1200).height(1400).url() : null,
          siteSettings?.aboutHeroImage ? urlFor(siteSettings.aboutHeroImage)?.width(1800).height(1200).url() : null,
          siteSettings?.ourWorkHeroImage ? urlFor(siteSettings.ourWorkHeroImage)?.width(1800).height(1200).url() : null,
          siteSettings?.programsHeroImage ? urlFor(siteSettings.programsHeroImage)?.width(1800).height(1200).url() : null,
          siteSettings?.galleryHeroImage ? urlFor(siteSettings.galleryHeroImage)?.width(1800).height(1200).url() : null,
          siteSettings?.donationHeroImage ? urlFor(siteSettings.donationHeroImage)?.width(1800).height(1200).url() : null,
          siteSettings?.contactHeroImage ? urlFor(siteSettings.contactHeroImage)?.width(1800).height(1200).url() : null,
          ...galleryItems
            .filter((item) => item.mediaType === 'image' && item.image)
            .slice(0, 6)
            .map((item) => urlFor(item.image)?.width(1400).height(1000).url())
            .filter(Boolean),
        ].filter(Boolean)

        await Promise.all(sources.map((src) => loadImage(src)))
      } catch {
        // Keep the site visible even if preloading fails.
      }
    }

    preload()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <UpdatePopup />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
