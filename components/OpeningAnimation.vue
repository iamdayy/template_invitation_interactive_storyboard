<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
    style="background-color: var(--bg-navy)">
    <!-- Curtain Panels -->
    <div class="absolute inset-y-0 left-0 w-1/2 z-20" :class="{ 'animate-curtain-left': animating }"
      style="background-color: var(--bg-navy)" />
    <div class="absolute inset-y-0 right-0 w-1/2 z-20" :class="{ 'animate-curtain-right': animating }"
      style="background-color: var(--bg-navy)" />

    <!-- Center Content -->
    <div class="relative z-30 flex flex-col items-center px-8 text-center max-w-lg mx-auto">
      <!-- Top ornament -->
      <div class="mb-6 opacity-0" :class="{ 'animate-fade-in': showContent }"
        style="animation-delay: 0.3s; animation-fill-mode: forwards;">
        <svg width="200" height="40" viewBox="0 0 200 40" class="text-gold">
          <line x1="0" y1="20" x2="70" y2="20" stroke="currentColor" stroke-width="1" opacity="0.6" />
          <circle cx="100" cy="20" r="4" fill="none" stroke="currentColor" stroke-width="1" />
          <circle cx="85" cy="20" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="115" cy="20" r="2" fill="currentColor" opacity="0.5" />
          <path d="M 92 12 L 100 20 L 108 12" fill="none" stroke="currentColor" stroke-width="1" />
          <path d="M 92 28 L 100 20 L 108 28" fill="none" stroke="currentColor" stroke-width="1" />
          <line x1="130" y1="20" x2="200" y2="20" stroke="currentColor" stroke-width="1" opacity="0.6" />
        </svg>
      </div>

      <!-- Recipient -->
      <div v-if="invitation.recipient.showInOpening" class="mb-5 opacity-0" :class="{ 'animate-fade-up': showContent }"
        style="animation-delay: 0.45s; animation-fill-mode: forwards;">
        <p class="font-sans text-cream/50 text-[11px] tracking-[0.25em] uppercase mb-1">
          {{ invitation.recipient.label }}
        </p>
        <p class="font-serif text-gold text-xl md:text-2xl leading-tight">
          {{ recipientName }}
        </p>
      </div>

      <!-- The Wedding of -->
      <p class="font-sans text-cream/60 text-xs tracking-[0.35em] uppercase mb-4 opacity-0"
        :class="{ 'animate-fade-up': showContent }" style="animation-delay: 0.5s; animation-fill-mode: forwards;">
        {{ invitation.opening.tagline }}
      </p>

      <!-- Couple Names -->
      <h1 class="font-serif text-5xl md:text-6xl leading-tight mb-2 opacity-0"
        :class="{ 'animate-fade-up': showContent }" style="animation-delay: 0.7s; animation-fill-mode: forwards;">
        <span class="gold-shimmer">{{ invitation.opening.groomName }}</span>
      </h1>
      <p class="font-sans text-gold/70 text-sm tracking-[0.4em] uppercase mb-2 opacity-0"
        :class="{ 'animate-fade-up': showContent }" style="animation-delay: 0.9s; animation-fill-mode: forwards;">
        {{ invitation.opening.andSymbol }}
      </p>
      <h1 class="font-serif text-5xl md:text-6xl leading-tight mb-6 opacity-0"
        :class="{ 'animate-fade-up': showContent }" style="animation-delay: 1.0s; animation-fill-mode: forwards;">
        <span class="gold-shimmer">{{ invitation.opening.brideName }}</span>
      </h1>

      <!-- Date -->
      <p class="font-sans text-cream/50 text-sm tracking-[0.25em] uppercase mb-8 opacity-0"
        :class="{ 'animate-fade-up': showContent }" style="animation-delay: 1.2s; animation-fill-mode: forwards;">
        {{ invitation.opening.dateLabel }}
      </p>

      <!-- Bottom ornament -->
      <div class="mb-8 opacity-0" :class="{ 'animate-fade-in': showContent }"
        style="animation-delay: 1.3s; animation-fill-mode: forwards;">
        <svg width="200" height="40" viewBox="0 0 200 40" class="text-gold">
          <line x1="0" y1="20" x2="70" y2="20" stroke="currentColor" stroke-width="1" opacity="0.6" />
          <circle cx="100" cy="20" r="4" fill="none" stroke="currentColor" stroke-width="1" />
          <circle cx="85" cy="20" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="115" cy="20" r="2" fill="currentColor" opacity="0.5" />
          <line x1="130" y1="20" x2="200" y2="20" stroke="currentColor" stroke-width="1" opacity="0.6" />
        </svg>
      </div>

      <!-- Open Button -->
      <button
        class="btn-gold px-10 py-3 text-sm tracking-[0.2em] uppercase font-sans font-semibold opacity-0 rounded-none"
        :class="{ 'animate-fade-up': showContent }" style="animation-delay: 1.5s; animation-fill-mode: forwards;"
        @click="openInvitation">
        {{ invitation.opening.openButtonLabel }}
      </button>

      <!-- Scroll hint -->
      <p class="font-sans text-cream/30 text-xs mt-6 tracking-widest uppercase opacity-0"
        :class="{ 'animate-fade-in': showContent }" style="animation-delay: 1.8s; animation-fill-mode: forwards;">
        ✦ {{ invitation.opening.footerHint }} ✦
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app';
import { computed, onMounted, ref } from 'vue';

import { useInvitationConfig } from '../composables/useInvitationConfig';

const invitation = useInvitationConfig()
const route = useRoute()

const recipientName = computed(() => {
  const queryTo = route.query.to
  const raw = Array.isArray(queryTo) ? queryTo[0] : queryTo
  if (typeof raw !== 'string' || raw.trim().length === 0) {
    return invitation.recipient.defaultName
  }

  const decoded = decodeURIComponent(raw).replace(/\+/g, ' ').trim()
  return decoded || invitation.recipient.defaultName
})

const emit = defineEmits<{
  opened: []
  startMusic: []
}>()

const showContent = ref(false)
const animating = ref(false)

onMounted(() => {
  setTimeout(() => {
    showContent.value = true
  }, 300)
})

function openInvitation() {
  emit('startMusic')
  animating.value = true
  setTimeout(() => {
    emit('opened')
  }, 1300)
}
</script>
