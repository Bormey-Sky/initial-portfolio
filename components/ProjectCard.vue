<script setup lang="ts">
  defineProps<{
    title: string
    description: string
    link: string
    tag?: string
    image: string
  }>()
  </script>

<template>
    <div>
      <div
        class="bg-white rounded-xl overflow-hidden shadow-md transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl w-full max-w-[23rem] aspect-[3/4] mb-6"
      >
        <!-- Card content divided into 8 rows -->
        <div class="grid grid-rows-8 h-full w-full">
          
          <!-- Image (6/8) -->
          <div class="row-span-6 w-full h-full overflow-hidden">
            <img
              :src="image"
              alt="Project preview"
              class="w-full h-full object-cover"
            />
          </div>
  
          <!-- Text (2/8) -->
          <div class="row-span-2 flex flex-col justify-between px-4 py-2">
            <div class="flex justify-between items-center">
              <Icon name="mdi:file" size="24" class="text-slate-600" />
              <NuxtLink :to="link" target="_blank" rel="noopener noreferrer">
                <Icon name="mdi:open-in-new" size="22" class="text-slate-600 hover:text-blue-500 transition" />
              </NuxtLink>
            </div>
            <div>
              <h3 class="text-base font-semibold text-slate-800 truncate">{{ title }}</h3>
              <p class="text-xs text-slate-600 line-clamp-2">{{ description }}</p>
            </div>
            <div v-if="tag" class="mt-1">
              <span class="inline-block bg-purple-700 text-white text-[10px] px-2 py-[2px] rounded-full">
                {{ tag }}
              </span>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  </template>
  
  
  