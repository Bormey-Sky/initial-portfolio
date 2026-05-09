<script setup lang="ts">
import type { Ref } from 'vue'

const route = useRoute()
const slug = route.params.id as string

const { data } = await useAsyncData(`notebook-${slug}`, () =>
  queryCollection('notebooks').where('slug', '=', slug).first()
)

if (!data.value) {
  throw createError({ statusCode: 404, message: 'Notebook not found' })
}

const notebook = data as Ref<NonNullable<typeof data.value>>

function handleDownload() {
  if (!notebook.value.pdf) return
  window.open(notebook.value.pdf, '_blank')
}
</script>

<template>
  <div class="bg-stone-50 min-h-screen px-6 py-16">
    <div class="max-w-3xl mx-auto">

      <!-- Back link -->
      <NuxtLink
        to="/notebook"
        class="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#8a7a62] hover:text-[#1a1510] transition-colors mb-12"
      >
        ← Back to Notebooks
      </NuxtLink>

      <!-- Header -->
      <header class="mb-10 pb-8 border-b border-[#d4c5a9]">
        <span class="inline-block text-[9px] font-light tracking-[0.2em] uppercase text-[#8a7a62] border border-[#c9b99a] px-2 py-0.5 mb-4">
          {{ notebook.tag }}
        </span>
        <h1 class="font-playfair text-4xl font-bold text-[#1a1510] leading-tight mb-2">
          {{ notebook.title }}
        </h1>
        <p v-if="notebook.subtitle" class="text-sm text-[#8a7a62] font-light mb-2">
          {{ notebook.subtitle }}
        </p>
        <p v-if="notebook.summary" class="text-sm text-[#8a7a62] font-light">
          {{ notebook.summary }}
        </p>
      </header>

      <!-- PDF download block (only shown when frontmatter has `pdf`) -->
      <div
        v-if="notebook.pdf"
        class="mb-10 p-6 border border-[#d4c5a9] border-l-[3px] border-l-[#1a1510] bg-[#fffdf7] flex items-center justify-between"
      >
        <div>
          <p class="text-[10px] tracking-[0.2em] uppercase text-[#8a7a62] mb-1">Full Paper</p>
          <p class="font-playfair text-lg font-bold text-[#1a1510]">{{ notebook.title }}</p>
        </div>
        <button
          class="text-[10px] tracking-[0.2em] uppercase text-[#fffdf7] bg-[#1a1510] px-5 py-2.5 hover:bg-[#5c4a2a] transition-colors cursor-pointer"
          @click="handleDownload"
        >
          Download PDF
        </button>
      </div>

      <!-- Markdown body (renders text, code, and embedded ::graph-viewer blocks) -->
      <div class="prose prose-stone prose-headings:font-playfair prose-headings:text-[#1a1510] prose-p:text-[#5a4f40] prose-p:leading-relaxed prose-pre:bg-[#1a1510] prose-pre:text-[#fffdf7] max-w-none">
        <ContentRenderer :value="notebook" />
      </div>

    </div>
  </div>
</template>
