import { createError, defineEventHandler, readBody } from 'h3'
import { useRuntimeConfig } from 'nitropack/runtime'

interface SendItem {
  name: string
  phone: string
  url: string
}

interface SendResult {
  name: string
  phone: string
  success: boolean
  error?: string
  messageId?: string
}

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (!digits) return ''

  if (digits.startsWith('0')) {
    return `62${digits.slice(1)}`
  }

  return digits
}

function buildMessage(name: string, url: string) {
  return [
    `Halo ${name},`,
    '',
    'Kami mengundang Anda untuk menghadiri acara pernikahan kami.',
    'Silakan buka undangan digital melalui link berikut:',
    url,
    '',
    'Terima kasih.',
  ].join('\n')
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody<{ items?: SendItem[] }>(event)
  const items = body.items ?? []

  if (!Array.isArray(items) || items.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Data items kosong' })
  }

  const accessToken = config.whatsappAccessToken
  const phoneNumberId = config.whatsappPhoneNumberId

  if (!accessToken || !phoneNumberId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Konfigurasi WhatsApp API belum diatur. Isi NUXT_WHATSAPP_ACCESS_TOKEN dan NUXT_WHATSAPP_PHONE_NUMBER_ID.',
    })
  }

  const results: SendResult[] = []

  for (const item of items) {
    const phone = normalizePhone(item.phone)

    if (!phone) {
      results.push({
        name: item.name,
        phone: item.phone,
        success: false,
        error: 'Nomor tidak valid',
      })
      continue
    }

    try {
      const response = await $fetch<{ messages?: Array<{ id: string }> }>(
        `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: phone,
            type: 'text',
            text: {
              preview_url: true,
              body: buildMessage(item.name, item.url),
            },
          },
        }
      )

      results.push({
        name: item.name,
        phone,
        success: true,
        messageId: response.messages?.[0]?.id,
      })
    } catch (error: any) {
      results.push({
        name: item.name,
        phone,
        success: false,
        error: error?.data?.error?.message || error?.message || 'Gagal mengirim pesan',
      })
    }
  }

  const successCount = results.filter((r) => r.success).length
  const failedCount = results.length - successCount

  return {
    successCount,
    failedCount,
    results,
  }
})
