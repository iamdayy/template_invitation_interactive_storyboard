export interface NavSection {
  id: string
  label: string
}

export interface StoryEntry {
  year: string
  title: string
  description: string
  emoji: string
}

export interface EventItem {
  icon: string
  title: string
  subtitle: string
  date: string
  time: string
  venue: string
  address: string
  calendarLink: string
}

export interface GalleryPhoto {
  url: string
  alt: string
}

export interface AttendanceOption {
  value: string
  label: string
  emoji: string
}

export interface HealthProtocolItem {
  icon: string
  title: string
}

export interface ThemeColors {
  navy: string
  navyDark: string
  gold: string
  goldLight: string
  goldDark: string
  cream: string
  dark: string
}

export const invitationConfig = {
  meta: {
    title: 'Rangga & Amara - Wedding Invitation',
    description: 'A luxury digital wedding invitation',
  },

  recipient: {
    label: 'Kepada Yth.',
    defaultName: 'Bapak/Ibu/Saudara/i',
    showInOpening: true,
  },

  generator: {
    invitationPath: '/',
  },

  theme: {
    defaultPreset: 'luxury',
    defaultTone: 'light',
    presets: {
      luxury: {
        label: 'Luxury Gold',
        dark: {
          navy: '#0A1628',
          navyDark: '#050D1A',
          gold: '#C9A84C',
          goldLight: '#E8C87A',
          goldDark: '#A8893A',
          cream: '#F5EDD3',
          dark: '#050D1A',
        } as ThemeColors,
        light: {
          navy: '#EEF2F6',
          navyDark: '#FFFFFF',
          gold: '#A07B2C',
          goldLight: '#C8A14C',
          goldDark: '#6C531E',
          cream: '#1B2432',
          dark: '#FFFFFF',
        } as ThemeColors,
      },
      emerald: {
        label: 'Emerald Garden',
        dark: {
          navy: '#0D2C2A',
          navyDark: '#081C1A',
          gold: '#45B08C',
          goldLight: '#78D5B1',
          goldDark: '#2F866A',
          cream: '#E6F6F1',
          dark: '#081C1A',
        } as ThemeColors,
        light: {
          navy: '#EEF9F5',
          navyDark: '#FFFFFF',
          gold: '#2F866A',
          goldLight: '#45B08C',
          goldDark: '#1E5A46',
          cream: '#17362E',
          dark: '#FFFFFF',
        } as ThemeColors,
      },
      rose: {
        label: 'Rose Sunset',
        dark: {
          navy: '#2D1A24',
          navyDark: '#1E1118',
          gold: '#D978A8',
          goldLight: '#F3A5CC',
          goldDark: '#A9527D',
          cream: '#FBEAF1',
          dark: '#1E1118',
        } as ThemeColors,
        light: {
          navy: '#FFF1F7',
          navyDark: '#FFFFFF',
          gold: '#B85A88',
          goldLight: '#D978A8',
          goldDark: '#8A4166',
          cream: '#341A28',
          dark: '#FFFFFF',
        } as ThemeColors,
      },
    },
    fonts: {
      serif: '"Bodoni Moda", Georgia, serif',
      sans: '"DM Sans", system-ui, sans-serif',
    },
  },

  opening: {
    tagline: 'The Wedding of',
    groomName: 'Rangga',
    brideName: 'Amara',
    andSymbol: '&',
    dateLabel: '15 Agustus 2025',
    openButtonLabel: 'Buka Undangan',
    footerHint: 'Dengan Penuh Cinta',
  },

  hero: {
    topLabel: 'The Wedding of',
    groomName: 'Rangga',
    brideName: 'Amara',
    andSymbol: '&',
    dateLabel: 'Jumat, 15 Agustus 2025',
    locationLabel: 'Jakarta, Indonesia',
    scrollLabel: 'Scroll',
    backgroundImage:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80',
  },

  countdown: {
    sectionLabel: 'Menghitung Hari',
    title: 'Menuju Hari Bahagia',
    targetDate: '2025-08-15T09:00:00',
    weddingDateLabel: 'Jumat, 15 Agustus 2025',
    units: {
      days: 'Hari',
      hours: 'Jam',
      minutes: 'Menit',
      seconds: 'Detik',
    },
  },

  story: {
    sectionLabel: 'Perjalanan Cinta Kami',
    title: 'Kisah Kita',
    entries: [
      {
        year: '2019',
        title: 'Pertama Bertemu',
        description:
          'Pertemuan tak terduga di sebuah kafe kecil di Jakarta Selatan. Satu senyum yang mengubah segalanya.',
        emoji: '☕',
      },
      {
        year: '2020',
        title: 'Mulai Dekat',
        description:
          'Percakapan larut malam, pesan panjang yang tak berujung. Kami mulai menyadari betapa spesialnya satu sama lain.',
        emoji: '💬',
      },
      {
        year: '2021',
        title: 'Kami Resmi Berpacaran',
        description:
          'Di bawah langit bintang pantai Bali, Rangga mengungkapkan perasaannya. Momen yang akan selalu kami kenang.',
        emoji: '❤️',
      },
      {
        year: '2024',
        title: 'Lamaran',
        description:
          'Dengan cincin keluarga berusia tiga generasi, Rangga berlutut dan bertanya pertanyaan terpenting dalam hidupnya.',
        emoji: '💍',
      },
      {
        year: '2025',
        title: 'Menuju Pernikahan',
        description:
          'Kini kami siap melangkah bersama dalam ikatan suci pernikahan. Terima kasih telah menjadi bagian dari perjalanan kami.',
        emoji: '✨',
      },
    ] as StoryEntry[],
  },

  events: {
    sectionLabel: 'Rangkaian Acara',
    title: 'Detail Acara',
    calendarButtonLabel: 'Tambah ke Kalender',
    items: [
      {
        icon: '🕌',
        title: 'Akad Nikah',
        subtitle: 'Prosesi pernikahan islami',
        date: 'Jumat, 15 Agustus 2025',
        time: '08.00 - 10.00 WIB',
        venue: 'Masjid Istiqlal',
        address: 'Jl. Taman Wijaya Kusuma, Gambir, Jakarta Pusat',
        calendarLink:
          'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akad+Nikah+Rangga+%26+Amara&dates=20250815T010000Z/20250815T030000Z&details=Akad+Nikah&location=Masjid+Istiqlal,+Jakarta',
      },
      {
        icon: '🥂',
        title: 'Resepsi Pernikahan',
        subtitle: 'Perayaan bersama keluarga & sahabat',
        date: 'Jumat, 15 Agustus 2025',
        time: '18.00 - 21.00 WIB',
        venue: 'The Ritz-Carlton Pacific Place',
        address: 'Jl. Jenderal Sudirman Kav. 52-53, SCBD, Jakarta Selatan',
        calendarLink:
          'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Resepsi+Rangga+%26+Amara&dates=20250815T110000Z/20250815T140000Z&details=Resepsi+Pernikahan&location=The+Ritz-Carlton+Pacific+Place,+Jakarta',
      },
    ] as EventItem[],
  },

  gallery: {
    sectionLabel: 'Momen Berharga',
    title: 'Galeri Foto',
    photos: [
      { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80', alt: 'Wedding couple' },
      { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80', alt: 'Wedding ceremony' },
      { url: 'https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?w=600&q=80', alt: 'Wedding rings' },
      { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80', alt: 'Wedding flowers' },
      { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', alt: 'Wedding venue' },
      { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80', alt: 'Couple portrait' },
      { url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80', alt: 'Wedding cake' },
      { url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80', alt: 'Wedding moment' },
      { url: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=600&q=80', alt: 'Wedding celebration' },
    ] as GalleryPhoto[],
  },

  guestbook: {
    sectionLabel: 'Ucapan & Doa',
    title: 'Buku Tamu',
    description: 'Tinggalkan pesan dan doa terbaik untuk kami',
    nameLabel: 'Nama',
    namePlaceholder: 'Nama Anda',
    messageLabel: 'Pesan & Doa',
    messagePlaceholder: 'Ucapan dan doa terbaik untuk kedua mempelai...',
    sendButtonLabel: 'Kirim Pesan',
    sendingButtonLabel: 'Mengirim...',
    emptyState: 'Jadilah yang pertama memberikan ucapan',
    storageKey: 'wedding_guestbook',
  },

  rsvp: {
    sectionLabel: 'Konfirmasi Kehadiran',
    title: 'RSVP',
    deadlineLabel: '1 Agustus 2025',
    descriptionPrefix: 'Mohon konfirmasi kehadiran Anda sebelum',
    successTitle: 'Terima Kasih!',
    successMessage:
      'Konfirmasi kehadiran Anda telah kami terima. Kami menantikan kehadiran Anda di hari istimewa kami.',
    nameLabel: 'Nama Lengkap *',
    namePlaceholder: 'Nama Anda',
    phoneLabel: '3 Digit Terakhir No. HP *',
    phonePlaceholder: 'contoh: 123',
    phoneHint:
      'Digunakan untuk verifikasi. Contoh: jika nomor Anda 0812-3456-789, masukkan 789',
    attendanceLabel: 'Kehadiran *',
    guestCountLabel: 'Jumlah Tamu (termasuk Anda)',
    processingLabel: 'Memproses...',
    submitButtonLabel: 'Kirim Konfirmasi',
    phoneErrorMessage: 'Masukkan tepat 3 digit angka',
    attendanceOptions: [
      { value: 'hadir', label: 'Hadir', emoji: '🎉' },
      { value: 'tidak', label: 'Tidak Hadir', emoji: '😢' },
      { value: 'ragu', label: 'Belum Pasti', emoji: '🤔' },
    ] as AttendanceOption[],
    maxGuestCount: 6,
    storageKey: 'wedding_rsvp',
    backgroundImage:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80',
  },

  healthProtocol: {
    sectionLabel: 'Demi Kenyamanan Bersama',
    title: 'Protokol Kesehatan',
    description:
      'Demi kenyamanan dan keselamatan seluruh tamu undangan, kami memohon kesediaan Anda untuk mematuhi protokol berikut.',
    footerNote: 'Terima kasih atas pengertian dan kerja sama Anda',
    items: [
      { icon: '😷', title: 'Wajib memakai masker selama acara berlangsung' },
      { icon: '🌡️', title: 'Pengecekan suhu tubuh di pintu masuk' },
      { icon: '↔️', title: 'Menjaga jarak aman minimal 1 meter' },
      { icon: '🤝', title: 'Tidak berjabat tangan - sapa dengan senyuman' },
      { icon: '🧴', title: 'Tersedia hand sanitizer di setiap sudut venue' },
    ] as HealthProtocolItem[],
  },

  music: {
    fileUrl: '/music/background-music.mp3',
    loop: true,
    volume: 0.6,
    playTooltip: 'Putar Musik',
    activeTooltip: 'Musik Aktif',
    missingFileTooltip: 'File musik belum tersedia',
  },

  navigation: {
    sections: [
      { id: 'hero', label: 'Home' },
      { id: 'countdown', label: 'Countdown' },
      { id: 'story', label: 'Our Story' },
      { id: 'events', label: 'Events' },
      { id: 'gallery', label: 'Gallery' },
      { id: 'guestbook', label: 'Guestbook' },
      { id: 'rsvp', label: 'RSVP' },
    ] as NavSection[],
  },

  footer: {
    namesLabel: 'Rangga & Amara',
    subtitle: 'Together Forever - 2025',
    credit: 'Made with love - Luxury Wedding Invitation',
  },
}

export type InvitationConfig = typeof invitationConfig
