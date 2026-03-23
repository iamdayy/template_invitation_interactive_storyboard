<template>
  <section class="relative py-20 md:py-28 overflow-hidden" style="background-color: #050D1A">
    <div class="max-w-4xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-14">
        <p class="font-sans text-gold/70 text-xs tracking-[0.5em] uppercase mb-4 reveal">
          Demi Kenyamanan Bersama
        </p>
        <h2 class="font-serif text-4xl md:text-5xl text-cream mb-4 reveal">
          Protokol Kesehatan
        </h2>
        <div class="gold-divider max-w-xs mx-auto mb-6" />
        <p class="font-sans text-cream/50 text-sm reveal max-w-md mx-auto">
          Demi kenyamanan dan keselamatan seluruh tamu undangan, kami memohon kesediaan Anda untuk mematuhi protokol berikut.
        </p>
      </div>

      <!-- Protocol Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        <div
          v-for="(protocol, index) in protocols"
          :key="protocol.title"
          class="reveal flex flex-col items-center text-center p-5 group"
          :style="`
            background: linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(5,13,26,0.8) 100%);
            border: 1px solid rgba(201,168,76,0.15);
            transition-delay: ${index * 100}ms;
          `"
        >
          <!-- Icon circle -->
          <div
            class="w-14 h-14 rounded-full flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform duration-300"
            style="background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.25);"
          >
            {{ protocol.icon }}
          </div>

          <p class="font-sans text-cream/80 text-xs leading-relaxed">
            {{ protocol.title }}
          </p>
        </div>
      </div>

      <!-- Bottom note -->
      <p class="text-center font-sans text-cream/30 text-xs mt-10 tracking-wider reveal">
        ✦ Terima kasih atas pengertian dan kerja sama Anda ✦
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const protocols = [
  { icon: '😷', title: 'Wajib memakai masker selama acara berlangsung' },
  { icon: '🌡️', title: 'Pengecekan suhu tubuh di pintu masuk' },
  { icon: '↔️', title: 'Menjaga jarak aman minimal 1 meter' },
  { icon: '🤝', title: 'Tidak berjabat tangan — sapa dengan senyuman' },
  { icon: '🧴', title: 'Tersedia hand sanitizer di setiap sudut venue' },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.15 }
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>
