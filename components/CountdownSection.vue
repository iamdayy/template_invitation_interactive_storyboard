<template>
  <section id="countdown" class="relative py-24 md:py-32 overflow-hidden" style="background-color: var(--bg-dark)">
    <!-- Background ornament -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div
        class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </div>

    <div class="max-w-4xl mx-auto px-6 text-center">
      <!-- Section label -->
      <p class="font-sans text-gold/70 text-xs tracking-[0.5em] uppercase mb-4 reveal" ref="labelRef">
        {{ invitation.countdown.sectionLabel }}
      </p>

      <!-- Title -->
      <h2 class="font-serif text-4xl md:text-5xl text-cream mb-3 reveal" ref="titleRef">
        {{ invitation.countdown.title }}
      </h2>

      <div class="gold-divider max-w-xs mx-auto mb-12" />

      <!-- Countdown Grid -->
      <div class="grid grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
        <div v-for="unit in countdownUnits" :key="unit.label" class="flex flex-col items-center reveal">
          <!-- Number box -->
          <div class="relative w-full aspect-square max-w-[100px] mx-auto flex items-center justify-center mb-3 rounded"
            style="
              background: linear-gradient(135deg, var(--gold-08) 0%, rgb(var(--color-gold) / 0.03) 100%);
              border: 1px solid var(--gold-25);
            ">
            <!-- Corner accents -->
            <div class="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/50" />
            <div class="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/50" />
            <div class="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/50" />
            <div class="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/50" />

            <span class="font-serif text-3xl md:text-4xl gold-shimmer font-bold">
              {{ String(unit.value).padStart(2, '0') }}
            </span>
          </div>

          <p class="font-sans text-cream/50 text-xs tracking-[0.25em] uppercase">
            {{ unit.label }}
          </p>
        </div>
      </div>

      <!-- Wedding date reminder -->
      <p class="font-sans text-cream/40 text-sm mt-12 tracking-wider">
        {{ invitation.countdown.weddingDateLabel }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

import { useInvitationConfig } from '../composables/useInvitationConfig'

const invitation = useInvitationConfig()
const targetDate = new Date(invitation.countdown.targetDate)

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

const countdownUnits = computed(() => [
  { value: days.value, label: invitation.countdown.units.days },
  { value: hours.value, label: invitation.countdown.units.hours },
  { value: minutes.value, label: invitation.countdown.units.minutes },
  { value: seconds.value, label: invitation.countdown.units.seconds },
])

function updateCountdown() {
  const now = new Date()
  const diff = targetDate.getTime() - now.getTime()

  if (diff <= 0) {
    days.value = hours.value = minutes.value = seconds.value = 0
    return
  }

  days.value = Math.floor(diff / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  seconds.value = Math.floor((diff % (1000 * 60)) / 1000)
}

let timer: ReturnType<typeof setInterval>

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)

  // Scroll reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible')
      })
    },
    { threshold: 0.2 }
  )
  document.querySelectorAll('#countdown .reveal').forEach((el) => observer.observe(el))
})

onUnmounted(() => clearInterval(timer))
</script>
