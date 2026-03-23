<template>
  <section
    id="hero"
    class="relative w-full h-screen overflow-hidden flex items-center justify-center"
  >
    <!-- Parallax Background -->
    <div
      ref="bgRef"
      class="absolute inset-0 w-full h-[120%] -top-[10%] bg-center bg-cover"
      :style="{
        backgroundImage: `url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80')`,
        transform: `translateY(${parallaxY}px)`,
        transition: 'transform 0.1s linear',
      }"
    />

    <!-- Dark overlay gradient -->
    <div class="absolute inset-0 bg-gradient-to-b from-navy-dark/70 via-navy/50 to-navy-dark/90 z-10" />

    <!-- Floating ornament particles -->
    <div class="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      <div
        v-for="i in 8"
        :key="i"
        class="absolute w-1 h-1 rounded-full bg-gold/30"
        :style="{
          left: `${10 + i * 11}%`,
          top: `${20 + (i % 3) * 25}%`,
          animation: `pulse ${2 + i * 0.3}s ease-in-out ${i * 0.4}s infinite`,
        }"
      />
    </div>

    <!-- Content -->
    <div class="relative z-20 text-center px-6 max-w-3xl mx-auto">
      <!-- Top label -->
      <p class="font-sans text-gold/80 text-xs tracking-[0.5em] uppercase mb-6 animate-fade-up" style="animation-delay: 0.2s">
        The Wedding of
      </p>

      <!-- Ornament -->
      <div class="flex items-center justify-center gap-4 mb-8">
        <div class="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="#C9A84C" opacity="0.7"/>
        </svg>
        <div class="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
      </div>

      <!-- Names with glitch effect -->
      <h1 class="font-serif text-6xl md:text-8xl text-cream mb-3 animate-glitch leading-none">
        Rangga
      </h1>
      <p class="font-sans text-gold text-sm tracking-[0.6em] uppercase mb-3 animate-fade-in" style="animation-delay: 0.4s">
        &amp;
      </p>
      <h1 class="font-serif text-6xl md:text-8xl text-cream mb-8 animate-glitch leading-none" style="animation-delay: 1.5s">
        Amara
      </h1>

      <!-- Date divider -->
      <div class="gold-divider max-w-xs mx-auto mb-6" />

      <p class="font-sans text-cream/70 text-sm md:text-base tracking-[0.3em] uppercase animate-fade-up" style="animation-delay: 0.6s">
        Jumat, 15 Agustus 2025
      </p>
      <p class="font-sans text-cream/50 text-xs tracking-[0.2em] uppercase mt-2 animate-fade-up" style="animation-delay: 0.8s">
        Jakarta, Indonesia
      </p>
    </div>

    <!-- Scroll down indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce-slow">
      <p class="font-sans text-cream/40 text-xs tracking-widest uppercase">Scroll</p>
      <div class="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent" />
    </div>
  </section>
</template>

<script setup lang="ts">
const bgRef = ref<HTMLElement | null>(null)
const parallaxY = ref(0)

function handleScroll() {
  parallaxY.value = window.scrollY * 0.4
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
