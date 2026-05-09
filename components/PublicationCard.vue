<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  index: number
  to: string              
  tag: string
  title: string
  description: string
  meta?: string
}>()

const formattedIndex = computed(() => String(props.index).padStart(2, '0'))
</script>

<template>
  <NuxtLink :to="to" class="group relative block bg-[#fffdf7] border border-[#d4c5a9] border-t-[3px] border-t-[#1a1510] px-7 pt-8 pb-7 cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(26,21,16,0.12)] no-underline">
    <span
      class="absolute top-6 right-7 font-['Playfair_Display'] text-5xl font-bold text-[#e8dece] leading-none select-none"
    >
      {{ formattedIndex }}
    </span>

    <span
      class="inline-block text-[9px] font-light tracking-[0.2em] uppercase text-[#8a7a62] border border-[#c9b99a] px-2 py-0.5 mb-5"
    >
      {{ tag }}
    </span>

    <h3 class="font-['Playfair_Display'] text-xl font-bold text-[#1a1510] leading-snug mb-3.5 pr-10">
      {{ title }}
    </h3>

    <div class="w-8 h-px bg-[#5c4a2a] mb-3.5" />

    <p class="text-sm font-light italic text-[#5a4f40] leading-relaxed">
      {{ description }}
    </p>

    <div class="mt-6 pt-4 border-t border-[#e8dece] flex items-center justify-between">
      <span class="text-[10px] tracking-[0.1em] uppercase text-[#a08c6e] font-light">
        {{ meta }}
      </span>
      <span class="text-[#5c4a2a] text-base transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </div>
  </NuxtLink>
</template>