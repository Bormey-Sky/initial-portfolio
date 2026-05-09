<script setup lang="ts">
const { data: articles } = await useAsyncData("articles", () =>
  queryCollection("articles").order("date", "DESC").all(),
);
</script>

<template>
  <div class="bg-stone-50 min-h-screen px-6 py-16">
    <header class="text-center mb-16 max-w-2xl mx-auto">
      <p
        class="text-[10px] font-light tracking-[0.25em] uppercase text-[#8a7a62] mb-3"
      >
        Papers · Articles · Writing
      </p>
      <h1 class="font-playfair text-5xl font-bold text-[#1a1510] leading-tight">
        Published <em>Work</em>
      </h1>
      <div class="flex items-center justify-center gap-3 mt-5 max-w-xs mx-auto">
        <div class="flex-1 h-px bg-[#c9b99a]" />
        <span class="text-[#8a7a62] text-sm">✦</span>
        <div class="flex-1 h-px bg-[#c9b99a]" />
      </div>
    </header>

    <main
      class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      
      <PublicationCard
        v-for="(article, i) in articles"
        :key="article.slug"
        :index="i + 1"
        :to="`/articles/${article.slug}`"
        :tag="article.tag"
        :title="article.title"
        :description="article.summary"
        :meta="article.subtitle"
      />
    </main>
  </div>
</template>
