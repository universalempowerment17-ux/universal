import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

export const sanityConfigured = Boolean(projectId)

export const client = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true,
    })
  : null

const builder = client ? imageUrlBuilder(client) : null

export function urlFor(source) {
  if (!builder || !source) return null
  return builder.image(source)
}

export async function fetchGalleryItems() {
  if (!client) return []
  return client.fetch(
    `*[_type == "galleryItem"] | order(order asc, publishedAt desc) {
      _id,
      title,
      caption,
      mediaType,
      image,
      youtubeUrl,
      publishedAt,
      order
    }`
  )
}

export async function fetchDonationSettings() {
  if (!client) return null
  return client.fetch(
    `*[_type == "donationSettings"][0] {
      qrCodeImage,
      upiId,
      accountName,
      bankName,
      accountNumber,
      ifscCode,
      branch,
      donationNote
    }`
  )
}
