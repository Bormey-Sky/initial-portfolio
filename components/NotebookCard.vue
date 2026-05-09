<script setup lang="ts">
interface NotebookCardProps {
  id: string
  title: string
  description: string
  image: string
  tag?: string
}

const props = defineProps<NotebookCardProps>()
</script>

<template>
  <div
    class="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md 
           hover:shadow-2xl transition-all border border-gray-200"
  >
    <!-- Image Section -->
    <div class="relative h-40 w-full overflow-hidden">
      <img
        :src="image"
        alt="Preview"
        class="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
      />

      <!-- Gradient Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent 
               opacity-0 group-hover:opacity-100 transition"
      ></div>

      <!-- Tag Badge -->
      <div
        v-if="tag"
        class="absolute bottom-3 left-3 bg-white/80 backdrop-blur-md text-xs px-2 py-1 rounded-md font-semibold text-gray-700 shadow"
      >
        {{ tag }}
      </div>
    </div>

    <!-- Content Section -->
    <div class="p-5">
      <h2 class="text-xl font-semibold text-gray-800 group-hover:text-blue-600 mb-1">
        {{ title }}
      </h2>

      <p class="text-gray-500 text-sm line-clamp-2">
        {{ description }}
      </p>

      <!-- Footer -->
      <div
        class="mt-4 text-blue-500 opacity-0 group-hover:opacity-100 transition flex items-center gap-1"
      >
        <span class="text-sm font-medium">Open</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M12.293 4.293a1 1 0 011.414 0L18 8.586a1 1 0 010 1.414l-4.293 4.293a1 1 0 11-1.414-1.414L14.586 10H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Helps make text fit nicely */
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>
