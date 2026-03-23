<template>
  <div v-show="visible" class="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
    <!-- Tooltip -->
    <Transition name="tooltip">
      <div v-if="showTooltip"
        class="font-sans text-xs text-cream/80 bg-navy-dark border border-gold/20 px-3 py-1.5 rounded pointer-events-none">
        {{ hasAudioFile ? (isPlaying ? invitation.music.activeTooltip : invitation.music.playTooltip) :
          invitation.music.missingFileTooltip }}
      </div>
    </Transition>

    <!-- Player button -->
    <button
      class="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
      :class="!hasAudioFile ? 'opacity-60 cursor-not-allowed hover:scale-100' : ''" :disabled="!hasAudioFile" :style="isPlaying
        ? 'background: linear-gradient(135deg, var(--text-gold), rgb(var(--color-gold-dark))); box-shadow: 0 0 20px var(--gold-40);'
        : 'background: var(--navy-90); border: 1px solid var(--gold-35); box-shadow: 0 4px 15px rgba(0,0,0,0.4);'"
      @click="toggleMusic" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">
      <!-- Animated rings when playing -->
      <div v-if="isPlaying" class="absolute inset-0 rounded-full border border-gold/30 animate-ping" />
      <div v-if="isPlaying" class="absolute inset-0 scale-125 rounded-full border border-gold/15 animate-ping"
        style="animation-delay: 0.5s" />

      <!-- Icon -->
      <span class="text-xl" :class="isPlaying ? 'music-note-anim text-navy-dark' : 'text-gold'">
        {{ isPlaying ? '♪' : '♫' }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

import { useInvitationConfig } from '../composables/useInvitationConfig';

const invitation = useInvitationConfig()

const props = withDefaults(
  defineProps<{
    autoPlayKey?: number
    visible?: boolean
  }>(),
  {
    autoPlayKey: 0,
    visible: true,
  }
)

const isPlaying = ref(false)
const showTooltip = ref(false)
let audioElement: HTMLAudioElement | null = null

const hasAudioFile = computed(() => Boolean(invitation.music.fileUrl?.trim()))
const visible = computed(() => props.visible)

function getVolume() {
  const volume = Number(invitation.music.volume ?? 0.6)
  return Math.min(1, Math.max(0, volume))
}

function createAudioIfNeeded() {
  if (!import.meta.client || !hasAudioFile.value || audioElement) return

  audioElement = new Audio(invitation.music.fileUrl)
  audioElement.loop = Boolean(invitation.music.loop ?? true)
  audioElement.volume = getVolume()
  audioElement.preload = 'auto'
  audioElement.addEventListener('ended', () => {
    isPlaying.value = false
  })
}

function stopAudio() {
  if (!audioElement) return
  audioElement.pause()
  audioElement.currentTime = 0
}

async function toggleMusic() {
  if (!hasAudioFile.value) return

  createAudioIfNeeded()
  if (!audioElement) return

  if (isPlaying.value) {
    stopAudio()
    isPlaying.value = false
    return
  }

  try {
    await audioElement.play()
    isPlaying.value = true
  } catch (error) {
    console.warn('Gagal memutar file musik:', error)
    isPlaying.value = false
  }
}

watch(
  () => invitation.music.fileUrl,
  (nextFile) => {
    if (!import.meta.client) return

    stopAudio()
    isPlaying.value = false

    if (!audioElement) {
      if (nextFile?.trim()) createAudioIfNeeded()
      return
    }

    audioElement.src = nextFile?.trim() || ''
    audioElement.load()
  }
)

watch(
  () => invitation.music.volume,
  () => {
    if (audioElement) audioElement.volume = getVolume()
  }
)

watch(
  () => invitation.music.loop,
  (nextLoop) => {
    if (audioElement) audioElement.loop = Boolean(nextLoop ?? true)
  }
)

watch(
  () => props.autoPlayKey,
  async (next, prev) => {
    if (!import.meta.client || next === prev || isPlaying.value || !hasAudioFile.value) return
    await toggleMusic()
  }
)

onMounted(() => {
  createAudioIfNeeded()
})

onUnmounted(() => {
  stopAudio()
  if (audioElement) {
    audioElement.src = ''
    audioElement.load()
  }
  audioElement = null
})
</script>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
