<template>
  <section class="relative py-20 md:py-28 overflow-hidden" style="background-color: var(--bg-dark)">
    <div class="max-w-4xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-14">
        <p class="font-sans text-gold/70 text-xs tracking-[0.5em] uppercase mb-4 reveal">
          {{ invitation.healthProtocol.sectionLabel }}
        </p>
        <h2 class="font-serif text-4xl md:text-5xl text-cream mb-4 reveal">
          {{ invitation.healthProtocol.title }}
        </h2>
        <div class="gold-divider max-w-xs mx-auto mb-6" />
        <p class="font-sans text-cream/50 text-sm reveal max-w-md mx-auto">
          {{ invitation.healthProtocol.description }}
        </p>
      </div>

      <!-- Protocol Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        <div v-for="(protocol, index) in protocols" :key="protocol.title"
          class="reveal flex flex-col items-center text-center p-5 group" :style="`
            background: linear-gradient(135deg, var(--gold-06) 0%, var(--navy-80) 100%);
            border: 1px solid var(--gold-15);
            transition-delay: ${index * 100}ms;
          `">
          <!-- Icon circle -->
          <div
            class="w-14 h-14 rounded-full flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform duration-300"
            style="background: var(--gold-10); border: 1px solid var(--gold-25);">
            {{ protocol.icon }}
          </div>

          <p class="font-sans text-cream/80 text-xs leading-relaxed">
            {{ protocol.title }}
          </p>
        </div>
      </div>

      <!-- Bottom note -->
      <p class="text-center font-sans text-cream/30 text-xs mt-10 tracking-wider reveal">
        ✦ {{ invitation.healthProtocol.footerNote }} ✦
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useInvitationConfig } from '../composables/useInvitationConfig'

const invitation = useInvitationConfig()
const protocols = invitation.healthProtocol.items

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.15 }
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>
