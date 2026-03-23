<template>
    <main class="min-h-screen bg-dark text-cream py-12 px-6">
        <div class="max-w-5xl mx-auto">
            <div class="text-center mb-10">
                <p class="font-sans text-gold/70 text-xs tracking-[0.45em] uppercase mb-4">
                    Invitation Utility
                </p>
                <h1 class="font-serif text-4xl md:text-5xl text-cream mb-4">
                    Generator Link Tamu
                </h1>
                <p class="font-sans text-cream/60 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                    Cukup masukkan daftar nama tamu (satu nama per baris). Link personal akan dibuat otomatis.
                    Anda juga bisa aktifkan opsi kirim otomatis via WhatsApp API.
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-8">
                <section class="p-6 md:p-8"
                    style="background: linear-gradient(135deg, var(--gold-08) 0%, var(--navy-dark-90) 100%); border: 1px solid var(--gold-25);">
                    <h2 class="font-serif text-2xl text-gold mb-6">Input Data</h2>

                    <div class="space-y-5">
                        <div>
                            <label class="font-sans text-cream/70 text-xs tracking-widest uppercase mb-2 block">
                                Daftar Nama Tamu
                            </label>
                            <textarea v-model="guestList" rows="12"
                                class="luxury-input w-full px-4 py-3 text-sm resize-y"
                                placeholder="Keluarga Bapak Andi&#10;Bapak Budi Santoso&#10;Ibu Rina" />
                        </div>

                        <label class="flex items-start gap-3 cursor-pointer select-none">
                            <input v-model="autoSendWhatsApp" type="checkbox" class="mt-1 h-4 w-4 accent-gold" />
                            <span class="font-sans text-sm text-cream/70 leading-relaxed">
                                Kirim otomatis via WhatsApp API setelah generate.
                                <span class="block text-xs text-cream/45 mt-1">
                                    Nomor diambil dari mapping nama pada file config guest directory.
                                </span>
                            </span>
                        </label>

                        <div class="flex flex-wrap items-center gap-3">
                            <button class="btn-gold px-6 py-3 text-xs tracking-[0.2em] uppercase disabled:opacity-40"
                                :disabled="sending" @click="generateLinks">
                                {{ sending ? 'Memproses...' : autoSendWhatsApp ? 'Generate + Kirim WA' : 'Generate' }}
                            </button>
                            <button
                                class="px-6 py-3 text-xs tracking-[0.2em] uppercase border border-gold/35 text-gold hover:bg-gold/10 transition-colors"
                                @click="resetAll">
                                Reset
                            </button>
                        </div>
                    </div>
                </section>

                <section class="p-6 md:p-8"
                    style="background: linear-gradient(135deg, var(--navy-90) 0%, var(--gold-06) 100%); border: 1px solid var(--gold-20);">
                    <div class="flex items-start justify-between gap-4 mb-6">
                        <div>
                            <h2 class="font-serif text-2xl text-gold">Hasil URL</h2>
                            <p class="font-sans text-cream/50 text-xs mt-1">
                                Total: {{ generatedRows.length }} link
                            </p>
                        </div>
                        <button
                            class="px-4 py-2 text-[11px] tracking-[0.16em] uppercase border border-gold/35 text-gold hover:bg-gold/10 transition-colors disabled:opacity-40"
                            :disabled="generatedRows.length === 0 || copying" @click="copyAll">
                            {{ copying ? 'Menyalin...' : 'Copy All' }}
                        </button>
                    </div>

                    <div v-if="sendSummary" class="mb-4 p-3 border border-gold/20 bg-white/[0.02]">
                        <p class="font-sans text-xs text-cream/70">
                            WA API: <span class="text-gold">{{ sendSummary.success }}</span> berhasil,
                            <span class="text-red-300">{{ sendSummary.failed }}</span> gagal,
                            <span class="text-cream/50">{{ sendSummary.noPhone }}</span> tanpa nomor mapping.
                        </p>
                    </div>

                    <div v-if="generatedRows.length === 0"
                        class="text-center py-16 border border-dashed border-gold/20">
                        <p class="font-sans text-cream/40 text-sm">Belum ada data. Klik <span
                                class="text-gold">Generate</span>.</p>
                    </div>

                    <div v-else class="max-h-[540px] overflow-auto space-y-3 pr-1">
                        <article v-for="row in generatedRows" :key="row.id"
                            class="p-4 border border-gold/15 bg-white/[0.02]">
                            <div class="flex items-start justify-between gap-3 mb-1">
                                <p class="font-serif text-gold text-base">{{ row.name }}</p>
                                <p class="font-sans text-[11px] text-cream/50">
                                    {{ row.phone ? row.phone : 'Nomor belum ada' }}
                                </p>
                            </div>

                            <a :href="row.url" target="_blank" rel="noopener noreferrer"
                                class="font-sans text-cream/70 text-xs break-all hover:text-gold transition-colors">
                                {{ row.url }}
                            </a>

                            <p v-if="row.sendStatus === 'sent'" class="font-sans text-[11px] text-green-300 mt-2">
                                Terkirim via WhatsApp API
                            </p>
                            <p v-else-if="row.sendStatus === 'failed'" class="font-sans text-[11px] text-red-300 mt-2">
                                Gagal kirim: {{ row.sendError || 'Unknown error' }}
                            </p>
                        </article>
                    </div>
                </section>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app'
import { ref } from 'vue'

import { findPhoneByGuestName } from '../config/guestDirectory'
import { invitationConfig } from '../config/invitation'

interface GeneratedRow {
    id: string
    name: string
    url: string
    phone: string | null
    sendStatus: 'idle' | 'sent' | 'failed'
    sendError: string | null
}

const guestList = ref('')
const generatedRows = ref<GeneratedRow[]>([])
const copying = ref(false)
const sending = ref(false)
const autoSendWhatsApp = ref(false)
const sendSummary = ref<{ success: number; failed: number; noPhone: number } | null>(null)

const baseUrl = ref('')

if (import.meta.client) {
    baseUrl.value = window.location.origin
}

useHead({
    title: 'Generator Link Tamu',
})

function normalizePath(path: string) {
    const trimmed = path.trim()
    if (!trimmed) return '/'
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}

function buildInvitationUrl(name: string) {
    const cleanBase = baseUrl.value.trim().replace(/\/$/, '')
    const path = normalizePath(invitationConfig.generator.invitationPath)
    const separator = path.includes('?') ? '&' : '?'
    return `${cleanBase}${path}${separator}to=${encodeURIComponent(name)}`
}

async function generateLinks() {
    const names = guestList.value
        .split('\n')
        .map((name) => name.trim())
        .filter((name) => name.length > 0)

    generatedRows.value = names.map((name, index) => ({
        id: `${index}-${name}`,
        name,
        url: buildInvitationUrl(name),
        phone: findPhoneByGuestName(name),
        sendStatus: 'idle',
        sendError: null,
    }))

    sendSummary.value = null

    if (autoSendWhatsApp.value) {
        await sendViaWhatsAppApi()
    }
}

function resetAll() {
    guestList.value = ''
    generatedRows.value = []
    sendSummary.value = null
}

async function copyAll() {
    if (!import.meta.client || generatedRows.value.length === 0) return

    const text = generatedRows.value.map((row) => `${row.name}\t${row.url}`).join('\n')

    copying.value = true
    try {
        await navigator.clipboard.writeText(text)
    } finally {
        setTimeout(() => {
            copying.value = false
        }, 500)
    }
}

async function sendViaWhatsAppApi() {
    const rowsWithPhone = generatedRows.value.filter((row) => row.phone)
    const noPhoneCount = generatedRows.value.length - rowsWithPhone.length

    if (rowsWithPhone.length === 0) {
        sendSummary.value = {
            success: 0,
            failed: 0,
            noPhone: noPhoneCount,
        }
        return
    }

    sending.value = true
    try {
        const response = await $fetch<{
            successCount: number
            failedCount: number
            results: Array<{ name: string; success: boolean; error?: string }>
        }>('/api/whatsapp/send-bulk', {
            method: 'POST',
            body: {
                items: rowsWithPhone.map((row) => ({
                    name: row.name,
                    phone: row.phone,
                    url: row.url,
                })),
            },
        })

        for (const row of generatedRows.value) {
            const result = response.results.find((item) => item.name === row.name)
            if (!result) continue

            row.sendStatus = result.success ? 'sent' : 'failed'
            row.sendError = result.success ? null : (result.error || 'Unknown error')
        }

        sendSummary.value = {
            success: response.successCount,
            failed: response.failedCount,
            noPhone: noPhoneCount,
        }
    } catch {
        for (const row of rowsWithPhone) {
            row.sendStatus = 'failed'
            row.sendError = 'Gagal menghubungi endpoint WhatsApp API'
        }

        sendSummary.value = {
            success: 0,
            failed: rowsWithPhone.length,
            noPhone: noPhoneCount,
        }
    } finally {
        sending.value = false
    }
}
</script>
