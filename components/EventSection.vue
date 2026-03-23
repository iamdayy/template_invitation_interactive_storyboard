<template>
  <section id="events" class="relative py-24 md:py-32 overflow-hidden" style="background-color: var(--bg-dark)">
    <!-- Decorative background -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5"
        style="background: radial-gradient(circle, var(--text-gold) 0%, transparent 70%);" />
    </div>

    <div class="max-w-5xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <p class="font-sans text-gold/70 text-xs tracking-[0.5em] uppercase mb-4 reveal">
          {{ invitation.events.sectionLabel }}
        </p>
        <h2 class="font-serif text-4xl md:text-5xl text-cream mb-4 reveal">
          {{ invitation.events.title }}
        </h2>
        <div class="gold-divider max-w-xs mx-auto" />
      </div>

      <!-- Event Cards -->
      <div class="grid md:grid-cols-2 gap-8">
        <div v-for="event in events" :key="event.title" class="reveal relative group">
          <!-- Card -->
          <div class="p-8 h-full flex flex-col relative overflow-hidden"
            style="background: linear-gradient(135deg, var(--gold-08) 0%, var(--navy-dark-95) 100%); border: 1px solid var(--gold-25);">
            <!-- Gold corner ornaments -->
            <div class="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/50" />
            <div class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/50" />
            <div class="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/50" />
            <div class="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/50" />

            <!-- Shimmer overlay on hover -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style="background: linear-gradient(135deg, var(--gold-05) 0%, transparent 100%);" />

            <div class="relative z-10">
              <!-- Event icon -->
              <div class="text-4xl mb-4">{{ event.icon }}</div>

              <!-- Title -->
              <h3 class="font-serif text-2xl text-gold mb-2">{{ event.title }}</h3>

              <!-- Subtitle -->
              <p class="font-sans text-cream/50 text-xs tracking-widest uppercase mb-6">
                {{ event.subtitle }}
              </p>

              <div class="gold-divider mb-6" />

              <!-- Details -->
              <div class="space-y-4 flex-1">
                <div class="flex items-start gap-3">
                  <svg class="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p class="font-sans text-cream text-sm">{{ event.date }}</p>
                    <p class="font-sans text-cream/50 text-xs">{{ event.time }}</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <svg class="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p class="font-sans text-cream text-sm">{{ event.venue }}</p>
                    <p class="font-sans text-cream/50 text-xs">{{ event.address }}</p>
                  </div>
                </div>
              </div>

              <!-- Calendar button -->
              <a :href="event.calendarLink" target="_blank" rel="noopener noreferrer"
                class="mt-6 flex items-center justify-center gap-2 w-full py-2.5 btn-gold text-xs tracking-[0.15em] uppercase">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ invitation.events.calendarButtonLabel }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useInvitationConfig } from '../composables/useInvitationConfig'

const invitation = useInvitationConfig()
const events = invitation.events.items

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.2 }
  )
  document.querySelectorAll('#events .reveal').forEach((el) => observer.observe(el))
})
</script>
