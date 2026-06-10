function normalizeWhatsAppNumber(value) {
  const digits = value?.replace(/\D/g, '') || ''
  if (!digits) return ''
  if (digits.length === 10) return `91${digits}`
  return digits
}

function normalizeMessageField(value) {
  return String(value ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeLongMessage(value) {
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
    .trim()
}

const WHATSAPP_NUMBER = normalizeWhatsAppNumber(import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER)

export const whatsappConfigured = Boolean(WHATSAPP_NUMBER)

export function buildVolunteerMessage({ name, phone, email }) {
  const safeName = normalizeMessageField(name)
  const safePhone = normalizeMessageField(phone)
  const safeEmail = normalizeMessageField(email)

  return [
    'New volunteer form submission',
    `Name: ${safeName}`,
    `Phone: ${safePhone}`,
    safeEmail ? `Email: ${safeEmail}` : 'Email: Not provided',
  ].join('\n')
}

export function openVolunteerWhatsApp({ name, phone, email }) {
  if (!WHATSAPP_NUMBER) {
    throw new Error('WhatsApp is not configured. Add VITE_ADMIN_WHATSAPP_NUMBER to your .env file.')
  }

  const message = buildVolunteerMessage({ name, phone, email })
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  const popup = window.open(url, '_blank', 'noopener,noreferrer')
  if (!popup) {
    window.location.href = url
  }
}

export function buildContactMessage({ name, phone, email, message }) {
  const safeName = normalizeMessageField(name)
  const safePhone = normalizeMessageField(phone)
  const safeEmail = normalizeMessageField(email)
  const safeMessage = normalizeLongMessage(message)

  return [
    'New contact form submission',
    `Name: ${safeName}`,
    `Phone: ${safePhone}`,
    safeEmail ? `Email: ${safeEmail}` : 'Email: Not provided',
    '',
    'Message:',
    safeMessage,
  ].join('\n')
}

export function openContactWhatsApp({ name, phone, email, message }) {
  if (!WHATSAPP_NUMBER) {
    throw new Error('WhatsApp is not configured. Add VITE_ADMIN_WHATSAPP_NUMBER to your .env file.')
  }

  const text = buildContactMessage({ name, phone, email, message })
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`

  const popup = window.open(url, '_blank', 'noopener,noreferrer')
  if (!popup) {
    window.location.href = url
  }
}
