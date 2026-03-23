<template>
  <section id="story" class="relative py-24 md:py-32 overflow-hidden bg-navy">
    <!-- Background texture -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute inset-0 opacity-5"
        style="background-image: radial-gradient(circle at 2px 2px, #C9A84C 1px, transparent 0); background-size: 40px 40px;" />
    </div>

    <div class="max-w-5xl mx-auto px-6">
      <!-- Section header -->
      <div class="text-center mb-20">
        <p class="font-sans text-gold/70 text-xs tracking-[0.5em] uppercase mb-4 reveal">
          Perjalanan Cinta Kami
        </p>
        <h2 class="font-serif text-4xl md:text-5xl text-cream mb-4 reveal">
          Kisah Kita
        </h2>
        <div class="gold-divider max-w-xs mx-auto" />
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Center line -->
        <div class="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent hidden md:block" />

        <!-- Timeline entries -->
        <div
          v-for="(entry, index) in storyEntries"
          :key="entry.year"
          class="relative flex items-center mb-16 last:mb-0"
          :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
        >
          <!-- Content card -->
          <div
            class="w-full md:w-5/12 reveal"
            :class="index % 2 === 0 ? 'reveal-left md:text-right md:pr-12' : 'reveal-right md:text-left md:pl-12'"
          >
            <div
              class="p-6 rounded relative group"
              style="background: linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(10,22,40,0.8) 100%); border: 1px solid rgba(201,168,76,0.15);"
            >
              <!-- Corner accents -->
              <div class="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/40 rounded-tl" />
              <div class="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/40 rounded-br" />

              <p class="font-sans text-gold/60 text-xs tracking-widest uppercase mb-2">
                {{ entry.year }}
              </p>
              <h3 class="font-serif text-xl text-gold mb-2">{{ entry.title }}</h3>
              <p class="font-sans text-cream/60 text-sm leading-relaxed">
                {{ entry.description }}
              </p>
            </div>
          </div>

          <!-- Center dot (desktop) -->
          <div class="hidden md:flex w-2/12 justify-center">
            <div class="relative">
              <div class="w-4 h-4 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center z-10 relative">
                <div class="w-1.5 h-1.5 rounded-full bg-gold" />
              </div>
              <div class="absolute inset-0 rounded-full bg-gold/20 animate-ping" />
            </div>
          </div>

          <!-- Icon side (desktop spacer) -->
          <div class="hidden md:block w-5/12">
            <div
              v-if="index % 2 === 0"
              class="pl-12 reveal reveal-right"
            >
              <div class="text-4xl mb-2">{{ entry.emoji }}</div>
            </div>
            <div
              v-else
              class="pr-12 text-right reveal reveal-left"
            >
              <div class="text-4xl mb-2">{{ entry.emoji }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const storyEntries = [
  {
    year: '2019',
    title: 'Pertama Bertemu',
    description: 'Pertemuan tak terduga di sebuah kafe kecil di Jakarta Selatan. Satu senyum yang mengubah segalanya.',
    emoji: '☕',
  },
  {
    year: '2020',
    title: 'Mulai Dekat',
    description: 'Percakapan larut malam, pesan panjang yang tak berujung. Kami mulai menyadari betapa spesialnya satu sama lain.',
    emoji: '💬',
  },
  {
    year: '2021',
    title: 'Kami Resmi Berpacaran',
    description: 'Di bawah langit bintang pantai Bali, Rangga mengungkapkan perasaannya. Momen yang akan selalu kami kenang.',
    emoji: '❤️',
  },
  {
    year: '2024',
    title: 'Lamaran',
    description: 'Dengan cincin keluarga berusia tiga generasi, Rangga berlutut dan bertanya pertanyaan terpenting dalam hidupnya.',
    emoji: '💍',
  },
  {
    year: '2025',
    title: 'Menuju Pernikahan',
    description: 'Kini kami siap melangkah bersama dalam ikatan suci pernikahan. Terima kasih telah menjadi bagian dari perjalanan kami.',
    emoji: '✨',
  },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible')
      })
    },
    { threshold: 0.15 }
  )
  document.querySelectorAll('#story .reveal, #story .reveal-left, #story .reveal-right').forEach((el) =>
    observer.observe(el)
  )
})
</script>
