<script setup lang="ts">
const { data: notebooks } = await useAsyncData('notebooks', () =>
  queryCollection('notebooks').all()
)
</script>

<template>
  <div class="bg-stone-50 min-h-screen px-6 py-24">
    <!-- Editorial header -->
    <header class="text-center mb-16 max-w-2xl mx-auto">
      <p
        class="text-[10px] font-light tracking-[0.25em] uppercase text-[#8a7a62] mb-3"
      >
        Research · Notes · Explorations
      </p>
      <h1 class="font-playfair text-5xl font-bold text-[#1a1510] leading-tight">
        Digital <em>Notebook</em>
      </h1>
      <div class="flex items-center justify-center gap-3 mt-5 max-w-xs mx-auto">
        <div class="flex-1 h-px bg-[#c9b99a]" />
        <span class="text-[#8a7a62] text-sm">✦</span>
        <div class="flex-1 h-px bg-[#c9b99a]" />
      </div>
    </header>

    <!-- Cards -->
    <main
      class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <PublicationCard
        v-for="(nb, i) in notebooks"
        :key="nb.slug"
        :index="i + 1"
        :to="`/notebook/${nb.slug}`"
        :tag="nb.tag"
        :title="nb.title"
        :description="nb.subtitle ?? ''"
        :meta="nb.date ?? ''"
      />
    </main>
  </div>
</template>
