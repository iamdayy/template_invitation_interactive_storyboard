<template>
  <div>
    <!-- Opening Animation Overlay -->
    <Transition name="opening">
      <OpeningAnimation v-if="!opened" @opened="handleOpened" @start-music="handleStartMusic" />
    </Transition>

    <MusicPlayer :auto-play-key="musicAutoPlayKey" :visible="opened" />

    <!-- Main Invitation Content -->
    <div v-if="opened" class="relative">
      <div
        class="fixed left-4 bottom-6 z-40 bg-navy-dark/85 border border-gold/30 p-3 backdrop-blur-sm transition-all duration-300">
        <!-- Minimized State -->
        <div v-if="themeMinimized" class="flex items-center justify-center gap-2">
          <button title="Expand Theme" class="p-2 text-lg hover:text-gold transition-colors text-gold/70"
            @click="themeMinimized = false">
            ⚙️
          </button>
        </div>

        <!-- Expanded State -->
        <div v-else>
          <div class="flex items-center justify-between gap-2 mb-2">
            <p class="font-sans text-[10px] tracking-[0.2em] uppercase text-cream/60">Theme</p>
            <button title="Minimize Theme" class="p-1 text-lg hover:text-gold transition-colors text-gold/70"
              @click="themeMinimized = true">
              −
            </button>
          </div>
          <div class="flex items-center gap-2 mb-2">
            <select v-model="selectedPreset" class="luxury-input text-xs px-2 py-1 min-w-[130px]"
              @change="persistThemeSetting">
              <option v-for="preset in presetOptions" :key="preset.id" :value="preset.id"
                class="bg-navy-dark text-cream">
                {{ preset.label }}
              </option>
            </select>
            <button
              class="px-2.5 py-1 text-[10px] tracking-wider uppercase border border-gold/35 text-gold hover:bg-gold/10 transition-colors"
              @click="toggleTone">
              {{ selectedTone === 'dark' ? 'Gelap' : 'Cerah' }}
            </button>
          </div>
        </div>
      </div>
      <FloatingNav :sections="invitation.navigation.sections" />
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app'
import { computed, onMounted, ref, watch } from 'vue'

import { useInvitationConfig } from './composables/useInvitationConfig'

const invitation = useInvitationConfig()
const opened = ref(false)
const musicAutoPlayKey = ref(0)
const themeMinimized = ref(true)

type ThemeTone = 'dark' | 'light'
type ThemePresetId = keyof typeof invitation.theme.presets

const selectedPreset = ref<ThemePresetId>(invitation.theme.defaultPreset as ThemePresetId)
const selectedTone = ref<ThemeTone>(invitation.theme.defaultTone as ThemeTone)

const presetOptions = computed(() =>
  Object.entries(invitation.theme.presets).map(([id, value]) => ({
    id: id as ThemePresetId,
    label: value.label,
  }))
)

const activeThemeColors = computed(() =>
  invitation.theme.presets[selectedPreset.value]?.[selectedTone.value]
  || invitation.theme.presets[invitation.theme.defaultPreset as ThemePresetId][invitation.theme.defaultTone as ThemeTone]
)

function persistThemeSetting() {
  if (!import.meta.client) return
  localStorage.setItem('themePreset', selectedPreset.value)
  localStorage.setItem('themeTone', selectedTone.value)
}

function toggleTone() {
  selectedTone.value = selectedTone.value === 'dark' ? 'light' : 'dark'
  persistThemeSetting()
}

onMounted(() => {
  if (!import.meta.client) return

  const storedThemeMinimized = localStorage.getItem('themeMinimized')
  if (storedThemeMinimized !== null) {
    themeMinimized.value = storedThemeMinimized === 'true'
  }

  const storedPreset = localStorage.getItem('themePreset') as ThemePresetId | null

  if (storedPreset && invitation.theme.presets[storedPreset]) {
    selectedPreset.value = storedPreset
  }

  // Always start in light tone on initial load.
  selectedTone.value = 'light'
  localStorage.setItem('themeTone', 'light')
})

watch(
  () => themeMinimized.value,
  (next) => {
    if (!import.meta.client) return
    localStorage.setItem('themeMinimized', next ? 'true' : 'false')
  }
)

function hexToRgbTriplet(hex: string) {
  const normalized = hex.replace('#', '')
  const r = parseInt(normalized.slice(0, 2), 16)
  const g = parseInt(normalized.slice(2, 4), 16)
  const b = parseInt(normalized.slice(4, 6), 16)
  return `${r} ${g} ${b}`
}

const themeCssVars = computed(() => {
  const colors = activeThemeColors.value
  return [
    ':root {',
    `  --color-navy: ${hexToRgbTriplet(colors.navy)};`,
    `  --color-navy-dark: ${hexToRgbTriplet(colors.navyDark)};`,
    `  --color-gold: ${hexToRgbTriplet(colors.gold)};`,
    `  --color-gold-light: ${hexToRgbTriplet(colors.goldLight)};`,
    `  --color-gold-dark: ${hexToRgbTriplet(colors.goldDark)};`,
    `  --color-cream: ${hexToRgbTriplet(colors.cream)};`,
    '  --bg-dark: rgb(var(--color-navy-dark));',
    '  --bg-navy: rgb(var(--color-navy));',
    '  --text-gold: rgb(var(--color-gold));',
    '  --text-gold-light: rgb(var(--color-gold-light));',
    '  --text-cream: rgb(var(--color-cream));',
    '  --gold-05: rgb(var(--color-gold) / 0.05);',
    '  --gold-06: rgb(var(--color-gold) / 0.06);',
    '  --gold-08: rgb(var(--color-gold) / 0.08);',
    '  --gold-10: rgb(var(--color-gold) / 0.1);',
    '  --gold-15: rgb(var(--color-gold) / 0.15);',
    '  --gold-20: rgb(var(--color-gold) / 0.2);',
    '  --gold-25: rgb(var(--color-gold) / 0.25);',
    '  --gold-30: rgb(var(--color-gold) / 0.3);',
    '  --gold-35: rgb(var(--color-gold) / 0.35);',
    '  --gold-40: rgb(var(--color-gold) / 0.4);',
    '  --gold-50: rgb(var(--color-gold) / 0.5);',
    '  --gold-60: rgb(var(--color-gold) / 0.6);',
    '  --navy-80: rgb(var(--color-navy) / 0.8);',
    '  --navy-90: rgb(var(--color-navy) / 0.9);',
    '  --navy-dark-90: rgb(var(--color-navy-dark) / 0.9);',
    '  --navy-dark-95: rgb(var(--color-navy-dark) / 0.95);',
    '  --cream-50: rgb(var(--color-cream) / 0.5);',
    `  --font-serif: ${invitation.theme.fonts.serif};`,
    `  --font-sans: ${invitation.theme.fonts.sans};`,
    '}',
  ].join('\n')
})

useHead({
  title: invitation.meta.title,
  meta: [{ name: 'description', content: invitation.meta.description }],
  style: [{ innerHTML: themeCssVars }],
})

function handleOpened() {
  opened.value = true
}

function handleStartMusic() {
  musicAutoPlayKey.value += 1
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
