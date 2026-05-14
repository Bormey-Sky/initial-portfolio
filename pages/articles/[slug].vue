<script setup lang="ts">
import type { Ref } from 'vue'

const route = useRoute()
const slug = route.params.slug as string

const { data } = await useAsyncData(`article-${slug}`, () =>
  queryCollection('articles').where('slug', '=', slug).first()
)

if (!data.value) {
  throw createError({ statusCode: 404, message: 'Article not found' })
}

// Non-null alias — TypeScript narrows the inner type now,
// so `article.value` is never null in handleDownload or in the template.
const article = data as Ref<NonNullable<typeof data.value>>

onMounted(() => {
  $fetch('/api/track', { method: 'POST', body: { slug, type: 'view' } })
})

// Load stats
const { data: stats, refresh: refreshStats } = await useFetch(`/api/stats/${slug}`)

async function handleDownload() {
  if (!article.value.pdf) return
  await $fetch('/api/track', { method: 'POST', body: { slug, type: 'download' } })
  await refreshStats()
  window.open(article.value.pdf, '_blank')
}
</script>

<template>
  <div class="bg-stone-50 min-h-screen px-6 py-16">
    <div class="max-w-3xl mx-auto">

      <!-- Back link -->
      <NuxtLink
        to="/articles"
        class="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#8a7a62] hover:text-[#1a1510] transition-colors mb-12"
      >
        ← Back to Articles
      </NuxtLink>

      <!-- Header -->
      <header class="mb-10 pb-8 border-b border-[#d4c5a9]">
        <span class="inline-block text-[9px] font-light tracking-[0.2em] uppercase text-[#8a7a62] border border-[#c9b99a] px-2 py-0.5 mb-4">
          {{ article.tag }}
        </span>
        <h1 class="font-playfair text-4xl font-bold text-[#1a1510] leading-tight mb-2">
          {{ article.title }}
        </h1>
        <p class="text-sm text-[#8a7a62] font-light">{{ article.subtitle }}  · {{ article.date }}</p>


        <!-- Stats -->
        <div class="flex gap-6 mt-4 text-[10px] tracking-[0.15em] uppercase text-[#a08c6e]">
          <span>{{ stats?.views ?? 0 }} views</span>
          <span v-if="article.pdf">{{ stats?.downloads ?? 0 }} downloads</span>
        </div>
      </header>

      <!-- PDF download block (papers only) -->
      <div
        v-if="article.pdf"
        class="mb-10 p-6 border border-[#d4c5a9] border-l-[3px] border-l-[#1a1510] bg-[#fffdf7] flex items-center justify-between"
      >
        <div>
          <p class="text-[10px] tracking-[0.2em] uppercase text-[#8a7a62] mb-1">Full Paper</p>
          <p class="font-playfair text-lg font-bold text-[#1a1510]">{{ article.title }}</p>
        </div>
        <button
          class="text-[10px] tracking-[0.2em] uppercase text-[#fffdf7] bg-[#1a1510] px-5 py-2.5 hover:bg-[#5c4a2a] transition-colors cursor-pointer"
          @click="handleDownload"
        >
          Download PDF
        </button>
      </div>

      <!-- Markdown content -->
      <div class="prose prose-stone prose-headings:font-playfair prose-headings:text-[#1a1510] prose-p:text-[#5a4f40] prose-p:leading-relaxed max-w-none">
        <ContentRenderer :value="article" />
      </div>

    </div>
  </div>
</template>