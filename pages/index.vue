<template>
  <main class="bg-dark">
    <HeroSection id="hero" />
    <CountdownSection id="countdown" />
    <OurStorySection id="story" />
    <EventSection id="events" />
    <GallerySection id="gallery" />
    <GuestbookSection id="guestbook" />
    <RsvpSection id="rsvp" />
    <!-- <HealthProtocol /> -->

    <!-- Footer -->
    <footer class="bg-navy-dark py-12 text-center border-t border-gold/20">
      <div class="gold-divider mb-8" />
      <p class="font-serif text-gold text-lg mb-2">{{ invitation.footer.namesLabel }}</p>
      <p class="font-sans text-cream/50 text-sm tracking-widest uppercase">
        {{ invitation.footer.subtitle }}
      </p>
      <p class="font-sans text-cream/30 text-xs mt-4">
        {{ invitation.footer.credit }}
      </p>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app';

import { useInvitationConfig } from '../composables/useInvitationConfig';

const invitation = useInvitationConfig()

useHead({
  title: invitation.meta.title,
})
</script>
