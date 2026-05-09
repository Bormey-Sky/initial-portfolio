<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const currentSection = ref('home')
const sectionIds = ['home', 'about', 'projects']
let maxRatio = 0
let mostVisibleSection = ''

const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      let maxRatio = 0
      let mostVisibleId = ''

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio
          mostVisibleId = entry.target.id
        }
      })

      if (mostVisibleId) {
        currentSection.value = mostVisibleId
      }
    },
    {
      threshold: Array.from({ length: 101 }, (_, i) => i / 100) // 0 to 1 with fine steps
    }
  )

  sectionIds.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
}


onMounted(() => {
  if (route.path === '/') {
    // Wait a tick in case the DOM isn't fully rendered
    nextTick(() => {
      setupIntersectionObserver()
    })
  }
})

// Reset section on route change
watch(
  () => route.path,
  (newPath) => {
    if (newPath !== '/') {
      currentSection.value = ''
    } else {
      nextTick(() => setupIntersectionObserver())
    }
  }
)

const scrollToSection = async (id: string) => {
  if (route.path !== '/') {
    await router.push('/')
    // Delay scroll slightly until after DOM navigation/render
    setTimeout(() => scrollTo(id), 350)
  } else {
    scrollTo(id)
  }
}

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    // Remove hash from URL
    setTimeout(() => {
      history.replaceState(null, '', window.location.pathname)
    }, 500)
  }
}
</script>


<template>
  <nav class="fixed top-0 left-0 w-full navbar-text bg-stone-50 z-50 p-4 flex justify-center items-center font-playfair space-x-8">
    <a
  href="#home"
  @click.prevent="scrollToSection('home')"
  :class="route.path === '/' && currentSection === 'home' ? 'text-blue-300' : 'hover:text-blue-300'"
>Home</a>



    <a
      href="#about"
      @click.prevent="scrollToSection('about')"
      :class="route.path === '/' && currentSection === 'about' ? 'text-blue-300' : 'hover:text-blue-300'"
    >About</a>

    <a
      href="#projects"
      @click.prevent="scrollToSection('projects')"
      :class="route.path === '/' && currentSection === 'projects' ? 'text-blue-300' : 'hover:text-blue-300'"
    >Projects</a>

    <NuxtLink
      to="/Notebook"
      :class="route.path === '/Notebook' ? 'text-blue-300' : 'hover:text-blue-300'"
    >Notebook</NuxtLink>
  </nav>
</template>
