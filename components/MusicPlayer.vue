<template>
  <div class="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
    <!-- Tooltip -->
    <Transition name="tooltip">
      <div
        v-if="showTooltip"
        class="font-sans text-xs text-cream/80 bg-navy-dark border border-gold/20 px-3 py-1.5 rounded pointer-events-none"
      >
        {{ isPlaying ? 'Musik Aktif' : 'Putar Musik' }}
      </div>
    </Transition>

    <!-- Player button -->
    <button
      class="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
      :style="isPlaying
        ? 'background: linear-gradient(135deg, #C9A84C, #A8893A); box-shadow: 0 0 20px rgba(201,168,76,0.4);'
        : 'background: rgba(10,22,40,0.9); border: 1px solid rgba(201,168,76,0.35); box-shadow: 0 4px 15px rgba(0,0,0,0.4);'"
      @click="toggleMusic"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      <!-- Animated rings when playing -->
      <div
        v-if="isPlaying"
        class="absolute inset-0 rounded-full border border-gold/30 animate-ping"
      />
      <div
        v-if="isPlaying"
        class="absolute inset-0 scale-125 rounded-full border border-gold/15 animate-ping"
        style="animation-delay: 0.5s"
      />

      <!-- Icon -->
      <span
        class="text-xl"
        :class="isPlaying ? 'music-note-anim text-navy-dark' : 'text-gold'"
      >
        {{ isPlaying ? '♪' : '♫' }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
const isPlaying = ref(false)
const showTooltip = ref(false)
let audioCtx: AudioContext | null = null
let oscillator: OscillatorNode | null = null
let gainNode: GainNode | null = null

function createAmbientTone() {
  if (!import.meta.client) return

  try {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
    gainNode = audioCtx.createGain()
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime)
    gainNode.connect(audioCtx.destination)

    // Create a soft ambient chord (A major-ish)
    const frequencies = [220, 277.18, 329.63]
    frequencies.forEach((freq, i) => {
      const osc = audioCtx!.createOscillator()
      const oscGain = audioCtx!.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, audioCtx!.currentTime)
      oscGain.gain.setValueAtTime(0.05 - i * 0.01, audioCtx!.currentTime)
      osc.connect(oscGain)
      oscGain.connect(gainNode!)
      osc.start()
    })

    gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 1.5)
  } catch (e) {
    console.warn('Web Audio API not available:', e)
  }
}

function stopAmbientTone() {
  if (gainNode && audioCtx) {
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1)
    setTimeout(() => {
      try {
        audioCtx?.close()
      } catch {}
      audioCtx = null
      gainNode = null
    }, 1500)
  }
}

function toggleMusic() {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    createAmbientTone()
  } else {
    stopAmbientTone()
  }
}

onUnmounted(() => {
  if (isPlaying.value) stopAmbientTone()
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
