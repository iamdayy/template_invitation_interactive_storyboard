<template>
  <section id="rsvp" class="relative py-24 md:py-32 overflow-hidden bg-navy">
    <!-- Cinematic background -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute inset-0"
        :style="`background-image: url('${invitation.rsvp.backgroundImage}'); background-size: cover; background-position: center; opacity: 0.07;`" />
    </div>

    <div class="relative z-10 max-w-2xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <p class="font-sans text-gold/70 text-xs tracking-[0.5em] uppercase mb-4 reveal">
          {{ invitation.rsvp.sectionLabel }}
        </p>
        <h2 class="font-serif text-4xl md:text-5xl text-cream mb-4 reveal">
          {{ invitation.rsvp.title }}
        </h2>
        <div class="gold-divider max-w-xs mx-auto mb-6" />
        <p class="font-sans text-cream/50 text-sm reveal">
          {{ invitation.rsvp.descriptionPrefix }} <strong class="text-gold">{{ invitation.rsvp.deadlineLabel }}</strong>
        </p>
      </div>

      <!-- Success State -->
      <Transition name="fade">
        <div v-if="submitted" class="text-center py-16 reveal">
          <div class="text-6xl mb-6">✨</div>
          <h3 class="font-serif text-3xl text-gold mb-4">{{ invitation.rsvp.successTitle }}</h3>
          <p class="font-sans text-cream/70 text-sm leading-relaxed">
            {{ invitation.rsvp.successMessage }}
          </p>
          <div class="gold-divider max-w-xs mx-auto mt-8" />
        </div>
      </Transition>

      <!-- Form -->
      <Transition name="fade">
        <form v-if="!submitted" class="space-y-6 reveal" @submit.prevent="submitRsvp">
          <!-- Name -->
          <div>
            <label class="font-sans text-cream/70 text-xs tracking-widest uppercase mb-2 block">
              {{ invitation.rsvp.nameLabel }}
            </label>
            <input v-model="form.name" type="text" :placeholder="invitation.rsvp.namePlaceholder" required
              maxlength="80" class="luxury-input w-full px-4 py-3 text-sm" />
          </div>

          <!-- Phone last 3 digits -->
          <div>
            <label class="font-sans text-cream/70 text-xs tracking-widest uppercase mb-2 block">
              {{ invitation.rsvp.phoneLabel }}
            </label>
            <input v-model="form.phoneDigits" type="text" :placeholder="invitation.rsvp.phonePlaceholder" maxlength="3"
              inputmode="numeric" pattern="\d{3}" required class="luxury-input w-full px-4 py-3 text-sm"
              :class="{ 'border-red-500/70': phoneError }" />
            <p v-if="phoneError" class="font-sans text-red-400/80 text-xs mt-1.5">
              {{ phoneError }}
            </p>
            <p class="font-sans text-cream/30 text-xs mt-1.5">
              {{ invitation.rsvp.phoneHint }}
            </p>
          </div>

          <!-- Attendance -->
          <div>
            <label class="font-sans text-cream/70 text-xs tracking-widest uppercase mb-3 block">
              {{ invitation.rsvp.attendanceLabel }}
            </label>
            <div class="grid grid-cols-3 gap-3">
              <label v-for="option in attendanceOptions" :key="option.value" class="relative cursor-pointer">
                <input v-model="form.attendance" type="radio" :value="option.value" class="sr-only" />
                <div class="p-3 text-center transition-all duration-300 text-xs font-sans tracking-wide" :style="form.attendance === option.value
                  ? 'background: var(--gold-20); border: 1px solid var(--gold-60); color: var(--text-gold);'
                  : 'background: rgba(255,255,255,0.03); border: 1px solid var(--gold-15); color: var(--cream-50);'">
                  <div class="text-lg mb-1">{{ option.emoji }}</div>
                  {{ option.label }}
                </div>
              </label>
            </div>
          </div>

          <!-- Number of guests -->
          <div>
            <label class="font-sans text-cream/70 text-xs tracking-widest uppercase mb-2 block">
              {{ invitation.rsvp.guestCountLabel }}
            </label>
            <select v-model="form.guestCount"
              class="luxury-input w-full px-4 py-3 text-sm appearance-none cursor-pointer">
              <option v-for="n in invitation.rsvp.maxGuestCount" :key="n" :value="n">{{ n }} orang</option>
            </select>
          </div>

          <!-- Submit -->
          <button type="submit" class="btn-gold w-full py-4 text-sm tracking-[0.2em] uppercase mt-2"
            :disabled="loading">
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {{ invitation.rsvp.processingLabel }}
            </span>
            <span v-else>{{ invitation.rsvp.submitButtonLabel }} ✦</span>
          </button>
        </form>
      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

import { useInvitationConfig } from '../composables/useInvitationConfig'

const invitation = useInvitationConfig()

const form = reactive({
  name: '',
  phoneDigits: '',
  attendance: 'hadir',
  guestCount: 1,
})

const phoneError = ref('')
const loading = ref(false)
const submitted = ref(false)

const attendanceOptions = invitation.rsvp.attendanceOptions

const RSVP_KEY = invitation.rsvp.storageKey

function validatePhone(): boolean {
  const val = form.phoneDigits.trim()
  if (!/^\d{3}$/.test(val)) {
    phoneError.value = invitation.rsvp.phoneErrorMessage
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
    } catch { }
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
