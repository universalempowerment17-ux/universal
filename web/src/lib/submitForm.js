const SUBMIT_URL = import.meta.env.VITE_FORM_SUBMIT_URL

export const formSubmitConfigured = Boolean(SUBMIT_URL)

export async function submitUpdateForm({ name, phone, email }) {
  if (!SUBMIT_URL) {
    throw new Error('Form submission is not configured. Add VITE_FORM_SUBMIT_URL to your .env file.')
  }

  const response = await fetch(SUBMIT_URL, {
    method: 'POST',
    redirect: 'follow',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
    }),
  })

  const text = await response.text()
  let result = { success: false }

  try {
    result = JSON.parse(text)
  } catch {
    if (text.includes('success')) result = { success: true }
  }

  if (!result.success) {
    throw new Error(result.error || 'Failed to save your details. Please try again.')
  }

  return result
}
