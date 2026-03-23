<template>
  <section id="guestbook" class="relative py-24 md:py-32 overflow-hidden" style="background-color: #050D1A">
    <div class="max-w-3xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <p class="font-sans text-gold/70 text-xs tracking-[0.5em] uppercase mb-4 reveal">
          Ucapan & Doa
        </p>
        <h2 class="font-serif text-4xl md:text-5xl text-cream mb-4 reveal">
          Buku Tamu
        </h2>
        <div class="gold-divider max-w-xs mx-auto mb-6" />
        <p class="font-sans text-cream/50 text-sm reveal">
          Tinggalkan pesan dan doa terbaik untuk kami
        </p>
      </div>

      <!-- Form -->
      <div
        class="p-8 mb-12 reveal"
        style="background: linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(5,13,26,0.9) 100%); border: 1px solid rgba(201,168,76,0.2);"
      >
        <form @submit.prevent="submitMessage">
          <div class="mb-5">
            <label class="font-sans text-cream/70 text-xs tracking-widest uppercase mb-2 block">Nama</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Nama Anda"
              maxlength="60"
              required
              class="luxury-input w-full px-4 py-3 text-sm"
            />
          </div>

          <div class="mb-6">
            <label class="font-sans text-cream/70 text-xs tracking-widest uppercase mb-2 block">Pesan & Doa</label>
            <textarea
              v-model="form.message"
              placeholder="Ucapan dan doa terbaik untuk kedua mempelai..."
              rows="4"
              maxlength="300"
              required
              class="luxury-input w-full px-4 py-3 text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            class="btn-gold w-full py-3 text-xs tracking-[0.2em] uppercase"
            :disabled="submitting"
          >
            {{ submitting ? 'Mengirim...' : 'Kirim Pesan ✦' }}
          </button>
        </form>
      </div>

      <!-- Messages list -->
      <div class="space-y-4">
        <TransitionGroup name="message-list">
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="p-5 reveal"
            style="background: rgba(255,255,255,0.03); border: 1px solid rgba(201,168,76,0.1); border-left: 2px solid rgba(201,168,76,0.4);"
          >
            <div class="flex items-start justify-between mb-2">
              <p class="font-serif text-gold text-base">{{ msg.name }}</p>
              <p class="font-sans text-cream/30 text-xs">{{ msg.date }}</p>
            </div>
            <p class="font-sans text-cream/70 text-sm leading-relaxed">{{ msg.message }}</p>
          </div>
        </TransitionGroup>

        <p v-if="messages.length === 0" class="text-center font-sans text-cream/30 text-sm py-8">
          Jadilah yang pertama memberikan ucapan ✦
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface GuestMessage {
  id: string
  name: string
  message: string
  date: string
}

const form = reactive({
  name: '',
  message: '',
})

const submitting = ref(false)
const messages = ref<GuestMessage[]>([])

const STORAGE_KEY = 'wedding_guestbook'

function loadMessages() {
  if (import.meta.client) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) messages.value = JSON.parse(stored)
    } catch {}
  }
}

function saveMessages() {
  if (import.meta.client) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.value))
  }
}

async function submitMessage() {
  if (!form.name.trim() || !form.message.trim()) return

  submitting.value = true
  await new Promise((r) => setTimeout(r, 600))

  const msg: GuestMessage = {
    id: Date.now().toString(),
    name: form.name.trim(),
    message: form.message.trim(),
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
  }

  messages.value.unshift(msg)
  saveMessages()

  form.name = ''
  form.message = ''
  submitting.value = false
}

onMounted(() => {
  loadMessages()

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 }
  )
  document.querySelectorAll('#guestbook .reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped>
.message-list-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.message-list-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
