<template>
  <section id="gallery" class="relative py-24 md:py-32 overflow-hidden bg-navy">
    <!-- Lightbox -->
    <Transition name="lightbox">
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
        @click="lightboxOpen = false"
      >
        <button
          class="absolute top-6 right-6 text-white/70 hover:text-gold text-2xl transition-colors"
          @click="lightboxOpen = false"
        >
          ✕
        </button>
        <img
          :src="activeImage"
          :alt="activeAlt"
          class="max-h-[85vh] max-w-full object-contain"
          style="border: 1px solid rgba(201,168,76,0.3)"
          @click.stop
        />
      </div>
    </Transition>

    <div class="max-w-6xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <p class="font-sans text-gold/70 text-xs tracking-[0.5em] uppercase mb-4 reveal">
          Momen Berharga
        </p>
        <h2 class="font-serif text-4xl md:text-5xl text-cream mb-4 reveal">
          Galeri Foto
        </h2>
        <div class="gold-divider max-w-xs mx-auto" />
      </div>

      <!-- Masonry Grid -->
      <div class="columns-2 md:columns-3 gap-4 space-y-4">
        <div
          v-for="(photo, index) in photos"
          :key="photo.url"
          class="break-inside-avoid reveal cursor-pointer group relative overflow-hidden"
          style="border: 1px solid rgba(201,168,76,0)"
          @click="openLightbox(photo)"
        >
          <img
            :src="photo.url"
            :alt="photo.alt"
            class="w-full object-cover transition-all duration-700 group-hover:scale-110"
            :class="index % 3 === 0 ? 'aspect-[3/4]' : index % 3 === 1 ? 'aspect-square' : 'aspect-[4/3]'"
          />
          <!-- Overlay -->
          <div
            class="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-all duration-500 flex items-center justify-center"
          >
            <div
              class="w-10 h-10 rounded-full border border-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100"
            >
              <svg class="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
          <!-- Gold border on hover -->
          <div class="absolute inset-0 border border-gold/0 group-hover:border-gold/50 transition-all duration-500 pointer-events-none" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Photo {
  url: string
  alt: string
}

const lightboxOpen = ref(false)
const activeImage = ref('')
const activeAlt = ref('')

const photos: Photo[] = [
  { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80', alt: 'Wedding couple' },
  { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80', alt: 'Wedding ceremony' },
  { url: 'https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?w=600&q=80', alt: 'Wedding rings' },
  { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80', alt: 'Wedding flowers' },
  { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', alt: 'Wedding venue' },
  { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80', alt: 'Couple portrait' },
  { url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80', alt: 'Wedding cake' },
  { url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80', alt: 'Wedding moment' },
  { url: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=600&q=80', alt: 'Wedding celebration' },
]

function openLightbox(photo: Photo) {
  activeImage.value = photo.url.replace('w=600', 'w=1200')
  activeAlt.value = photo.alt
  lightboxOpen.value = true
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 }
  )
  document.querySelectorAll('#gallery .reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
