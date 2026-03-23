<template>
  <nav class="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
    <button v-for="(section, index) in sections" :key="section.id"
      class="group relative flex items-center justify-end gap-3" @click="scrollTo(section.id)">
      <!-- Label tooltip -->
      <span
        class="font-sans text-xs text-cream/80 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
        {{ section.label }}
      </span>

      <!-- Dot -->
      <div class="w-2.5 h-2.5 rounded-full border transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)" :class="activeSection === section.id
        ? 'bg-gold border-gold scale-125 shadow-[0_0_8px_var(--gold-60)]'
        : 'bg-transparent border-cream/40 hover:border-gold/70'" />
    </button>
  </nav>
</template>

<script setup lang="ts">
interface Section {
  id: string
  label: string
}

const props = defineProps<{
  sections: Section[]
}>()

const activeSection = ref(props.sections[0]?.id ?? '')

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { threshold: 0.4 }
  )

  props.sections.forEach((section) => {
    const el = document.getElementById(section.id)
    if (el) observer.observe(el)
  })

  onUnmounted(() => observer.disconnect())
})
</script>
