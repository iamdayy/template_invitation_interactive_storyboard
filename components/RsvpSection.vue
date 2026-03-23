<template>
  <section id="rsvp" class="relative py-24 md:py-32 overflow-hidden bg-navy">
    <!-- Cinematic background -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute inset-0"
        style="background-image: url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80'); background-size: cover; background-position: center; opacity: 0.07;"
      />
    </div>

    <div class="relative z-10 max-w-2xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <p class="font-sans text-gold/70 text-xs tracking-[0.5em] uppercase mb-4 reveal">
          Konfirmasi Kehadiran
        </p>
        <h2 class="font-serif text-4xl md:text-5xl text-cream mb-4 reveal">
          RSVP
        </h2>
        <div class="gold-divider max-w-xs mx-auto mb-6" />
        <p class="font-sans text-cream/50 text-sm reveal">
          Mohon konfirmasi kehadiran Anda sebelum <strong class="text-gold">1 Agustus 2025</strong>
        </p>
      </div>

      <!-- Success State -->
      <Transition name="fade">
        <div
          v-if="submitted"
          class="text-center py-16 reveal"
        >
          <div class="text-6xl mb-6">✨</div>
          <h3 class="font-serif text-3xl text-gold mb-4">Terima Kasih!</h3>
          <p class="font-sans text-cream/70 text-sm leading-relaxed">
            Konfirmasi kehadiran Anda telah kami terima.<br />
            Kami menantikan kehadiran Anda di hari istimewa kami.
          </p>
          <div class="gold-divider max-w-xs mx-auto mt-8" />
        </div>
      </Transition>

      <!-- Form -->
      <Transition name="fade">
        <form
          v-if="!submitted"
          class="space-y-6 reveal"
          @submit.prevent="submitRsvp"
        >
          <!-- Name -->
          <div>
            <label class="font-sans text-cream/70 text-xs tracking-widest uppercase mb-2 block">
              Nama Lengkap *
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Nama Anda"
              required
              maxlength="80"
              class="luxury-input w-full px-4 py-3 text-sm"
            />
          </div>

          <!-- Phone last 3 digits -->
          <div>
            <label class="font-sans text-cream/70 text-xs tracking-widest uppercase mb-2 block">
              3 Digit Terakhir No. HP *
            </label>
            <input
              v-model="form.phoneDigits"
              type="text"
              placeholder="contoh: 123"
              maxlength="3"
              inputmode="numeric"
              pattern="\d{3}"
              required
              class="luxury-input w-full px-4 py-3 text-sm"
              :class="{ 'border-red-500/70': phoneError }"
            />
            <p v-if="phoneError" class="font-sans text-red-400/80 text-xs mt-1.5">
              {{ phoneError }}
            </p>
            <p class="font-sans text-cream/30 text-xs mt-1.5">
              Digunakan untuk verifikasi. Contoh: jika nomor Anda 0812-3456-<strong>789</strong>, masukkan <strong>789</strong>
            </p>
          </div>

          <!-- Attendance -->
          <div>
            <label class="font-sans text-cream/70 text-xs tracking-widest uppercase mb-3 block">
              Kehadiran *
            </label>
            <div class="grid grid-cols-3 gap-3">
              <label
                v-for="option in attendanceOptions"
                :key="option.value"
                class="relative cursor-pointer"
              >
                <input
                  v-model="form.attendance"
                  type="radio"
                  :value="option.value"
                  class="sr-only"
                />
                <div
                  class="p-3 text-center transition-all duration-300 text-xs font-sans tracking-wide"
                  :style="form.attendance === option.value
                    ? 'background: rgba(201,168,76,0.2); border: 1px solid rgba(201,168,76,0.6); color: #C9A84C;'
                    : 'background: rgba(255,255,255,0.03); border: 1px solid rgba(201,168,76,0.15); color: rgba(245,237,211,0.5);'"
                >
                  <div class="text-lg mb-1">{{ option.emoji }}</div>
                  {{ option.label }}
                </div>
              </label>
            </div>
          </div>

          <!-- Number of guests -->
          <div>
            <label class="font-sans text-cream/70 text-xs tracking-widest uppercase mb-2 block">
              Jumlah Tamu (termasuk Anda)
            </label>
            <select
              v-model="form.guestCount"
              class="luxury-input w-full px-4 py-3 text-sm appearance-none cursor-pointer"
            >
              <option v-for="n in 6" :key="n" :value="n">{{ n }} orang</option>
            </select>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="btn-gold w-full py-4 text-sm tracking-[0.2em] uppercase mt-2"
            :disabled="loading"
          >
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Memproses...
            </span>
            <span v-else>Kirim Konfirmasi ✦</span>
          </button>
        </form>
      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">
const form = reactive({
  name: '',
  phoneDigits: '',
  attendance: 'hadir',
  guestCount: 1,
})

const phoneError = ref('')
const loading = ref(false)
const submitted = ref(false)

const attendanceOptions = [
  { value: 'hadir', label: 'Hadir', emoji: '🎉' },
  { value: 'tidak', label: 'Tidak Hadir', emoji: '😢' },
  { value: 'ragu', label: 'Belum Pasti', emoji: '🤔' },
]

const RSVP_KEY = 'wedding_rsvp'

function validatePhone(): boolean {
  const val = form.phoneDigits.trim()
  if (!/^\d{3}$/.test(val)) {
    phoneError.value = 'Masukkan tepat 3 digit angka'
    return false
  }
  phoneError.value = ''
  return true
}

async function submitRsvp() {
  if (!validatePhone()) return

  loading.value = true
  await new Promise((r) => setTimeout(r, 1000))

  const entry = {
    id: Date.now().toString(),
    ...form,
    submittedAt: new Date().toISOString(),
  }

  if (import.meta.client) {
    try {
      const existing = JSON.parse(localStorage.getItem(RSVP_KEY) || '[]')
      existing.push(entry)
      localStorage.setItem(RSVP_KEY, JSON.stringify(existing))
    } catch {}
  }

  loading.value = false
  submitted.value = true
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.15 }
  )
  document.querySelectorAll('#rsvp .reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
