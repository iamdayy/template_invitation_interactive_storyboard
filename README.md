# template_invitation_interactive_storyboard
Template undangan digital daydev dengan tema Interactive Storyboard

## Konfigurasi Data dan Tema

Semua data utama undangan dan tema sekarang bisa diubah dari satu file:

- `config/invitation.ts`

### Yang bisa diubah dari config

- `meta`: judul halaman dan deskripsi
- `recipient`: nama penerima undangan default
- `theme.colors` dan `theme.fonts`: warna dan font global
- `opening`, `hero`, `countdown`, `story`, `events`, `gallery`
- `guestbook`, `rsvp`, `healthProtocol`, `music`, `navigation`, `footer`

### Cara pakai

1. Edit nilai yang dibutuhkan di `config/invitation.ts`.
2. Jalankan project seperti biasa:

```bash
npm run dev
```

Token tema (`theme.colors` dan `theme.fonts`) otomatis dipetakan ke CSS variable, sehingga komponen yang memakai kelas Tailwind (`text-gold`, `bg-navy`, dll) ikut berubah tanpa edit manual per komponen.

### Preset + Tone (Gelap/Cerah)

Tema sekarang mendukung:

- Preset warna: `luxury`, `emerald`, `rose`
- Tone: `dark` dan `light`

Pengaturan default ada di `config/invitation.ts`:

- `theme.defaultPreset`
- `theme.defaultTone`

Pengguna bisa switch preset/tone langsung dari panel Theme di aplikasi (kiri bawah setelah undangan dibuka). Pilihan akan disimpan otomatis di browser.

### Musik Dari File

Player musik sekarang memakai file audio dari folder `public`.

Pengaturan di `config/invitation.ts`:

- `music.fileUrl`: path file audio (default: `/audio/wedding-theme.mp3`)
- `music.loop`: ulang otomatis
- `music.volume`: volume 0 sampai 1

Langkah cepat:

1. Taruh file musik di folder `public/audio`.
2. Samakan nama file dengan `music.fileUrl`.
3. Jalankan aplikasi, lalu klik tombol musik.

### Personalisasi nama tamu via URL

Selain dari `recipient.defaultName`, nama tamu bisa dikirim lewat query param `to`.

Contoh:

`http://localhost:3000/?to=Keluarga%20Bapak%20Andi`

### Generator otomatis

Halaman generator tersedia di:

`http://localhost:3000/generator`

Fitur generator:

- Cukup input banyak nama tamu (1 baris = 1 tamu)
- Generate otomatis URL personal dengan query `to`
- Copy semua hasil sekaligus (format: `nama<TAB>url`)
- Opsi kirim otomatis via WhatsApp API

### WhatsApp API (opsional)

Jika ingin kirim otomatis setelah generate:

1. Isi mapping nama ke nomor di `config/guestDirectory.ts`.
2. Set environment variable:

```bash
NUXT_WHATSAPP_ACCESS_TOKEN=your_access_token
NUXT_WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
```

3. Aktifkan checkbox `Kirim otomatis via WhatsApp API` di halaman generator.

Catatan:

- Generator tetap bisa dipakai tanpa WhatsApp API.
- Jika nama tidak ditemukan di `config/guestDirectory.ts`, link tetap dibuat tapi pesan tidak akan dikirim otomatis.
