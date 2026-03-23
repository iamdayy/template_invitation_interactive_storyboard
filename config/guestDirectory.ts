export const guestDirectory: Record<string, string> = {
  'Keluarga Bapak Andi': '628111111111',
  'Bapak Budi Santoso': '628122222222',
  'Ibu Rina': '628133333333',
}

export function findPhoneByGuestName(name: string): string | null {
  const target = name.trim().toLowerCase()
  if (!target) return null

  for (const [guestName, phone] of Object.entries(guestDirectory)) {
    if (guestName.trim().toLowerCase() === target) {
      return phone
    }
  }

  return null
}
