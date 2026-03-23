<template>
  <div>
    <!-- Opening Animation Overlay -->
    <Transition name="opening">
      <OpeningAnimation v-if="!opened" @opened="handleOpened" />
    </Transition>

    <!-- Main Invitation Content -->
    <div v-if="opened" class="relative">
      <FloatingNav :sections="navSections" />
      <MusicPlayer />
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
const opened = ref(false)

const navSections = [
  { id: 'hero', label: 'Home' },
  { id: 'countdown', label: 'Countdown' },
  { id: 'story', label: 'Our Story' },
  { id: 'events', label: 'Events' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'guestbook', label: 'Guestbook' },
  { id: 'rsvp', label: 'RSVP' },
]

function handleOpened() {
  opened.value = true
}
</script>

<style>
.opening-leave-active {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.opening-leave-to {
  opacity: 0;
}
</style>
