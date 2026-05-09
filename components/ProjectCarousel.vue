<template>
    <div class="w-full">
      <!-- Carousel for small screens -->
      <div class="block md:hidden overflow-x-auto no-scrollbar">
        <div class="flex gap-4 px-4 pb-4 snap-x snap-mandatory">
          <div
            v-for="(project, index) in projects"
            :key="index"
            class="flex-shrink-0 snap-start"
            style="width: 80vw; max-width: 320px"
          >
            <ProjectCard
              :title="project.title"
              :description="project.description"
              :link="project.link"
              :image="project.image"
              :tag="project.tag"
            />
          </div>
        </div>
      </div>
  
      <!-- Grid for medium and up -->
      <div class="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        <ProjectCard
          v-for="(project, index) in projects"
          :key="index"
          v-bind="project"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import ProjectCard from './ProjectCard.vue'
  
  const projects = [
    {
      title: 'SnapRec',
      description: 'Receipt scanner powered by AI and OCR.',
      link: 'https://snaprec.io',
      image: 'images/mango-preview.png',
      tag: 'AI Project',
    },
    {
      title: 'DataBot',
      description: 'A chatbot assistant for business insights.',
      link: 'https://databot.ai',
      image: 'images/mango-preview.png',
      tag: 'Chatbot',
    },
    {
      title: 'LangBuddy',
      description: 'Learn German with interactive AI-powered lessons.',
      link: 'https://langbuddy.app',
      image: 'images/mango-preview.png',
      tag: 'Language',
    },
  ]
  </script>
  
  <style scoped>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  </style>
  