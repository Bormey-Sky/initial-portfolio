<script setup lang="ts">
import { ref, onMounted } from "vue";
import Projects from "./projects.vue";
import About from "./about.vue";
// import PassionProject from "./passionProject.vue";


const pageTitle = 'Bormey Chanchem';
const pageDescription = 'Explore the portfolio of Bormey Chanchem, a passionate Developer and AI enthusiast on her way to persuing a master degree. View projects and get in touch.';
const pageImage = 'https://www.bormeychanchem.com/images/og-image-portfolio.jpg'; // IMPORTANT: Use an absolute URL! Needs to be ~1200x630px
const pageUrl = 'https://www.bormeychanchem.com/';

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  
  // --- Open Graph (Facebook, LinkedIn, etc.) ---
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogImage: pageImage, // Link to an attractive image representing your portfolio
  ogUrl: pageUrl,     // The canonical URL for this page
  ogType: 'profile', // Use 'profile' for a page specifically about you
  ogLocale: 'en_US',  // Optional: Specify locale
});

// --- More Advanced Head Management (using useHead) ---
useHead({
  // --- Canonical URL ---
  link: [
    {
      rel: 'canonical',
      href: pageUrl, // Ensures search engines prioritize this URL
    },
  ],

  // --- Structured Data (Schema.org - VERY important for professional look) ---
  // This example defines you as a 'Person'. Use Google's Rich Results Test tool to validate.
  script: [
    {
      type: 'application/ld+json',
      // Use innerHTML or children to inject the JSON string
      // Using JSON.stringify is safer to avoid syntax errors
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person', // Or 'WebSite' for the site overall, 'ProfilePage' etc.
        'name': 'Bormey Chanchem',
        'url': pageUrl,
        'image': 'https://www.bormeychanchem.com/images/profile-photo.jpg', // Link to your professional photo
        'sameAs': [ // Links to your professional profiles
          'https://www.linkedin.com/in/bormey-chanchem-22aa9020a/',
          'https://github.com/Bormey-Sky?tab=repositories',
        ],
        'jobTitle': 'Student and Freelancer',
        'worksFor': {
          '@type': 'Private',
          'name': 'Future Me' // Or your company name
        },
        'alumniOf': { 
            '@type': 'University',
            'name': 'Paragon International University'
        },
        'knowsAbout': ['AI', 'NLP', 'Research', 'Web Development', 'Vue.js', 'Nuxt', 'JavaScript', 'TypeScript', 'SEO'] // Your skills
      }),
    },
  ],
  htmlAttrs: {
    lang: 'en' 
  }
});


const mainSection = ref<HTMLElement | null>(null);
const animationKey = ref(0);




</script>


<template>
  <div id="home" class="relative w-screen h-screen overflow-hidden bg-stone-50 scroll-smooth">
    <!-- overlay on top -->
    <div class="absolute top-0 left-0 w-full h-[30vh] bg-stone-50 z-20">
      <div class="bg-amber-300 w-fit h-fit text-center mt-24 p-4 font-mono font-bold text-2xl italic"> !Under Construction!</div>
    </div>
    <div class="absolute bottom-0 left-0 w-full h-[30vh] bg-stone-50 z-20">
      <div class="pt-12 pl-8 pr-8">
        <Typewriter 
      phrase="This site is where works in progress are accepted"
      :typo="false"
      :typeSpeed="80"
      :restart="true"
      class="text-center page-description"
      />
      </div>
    </div>

    <!-- Centered text animating behind curtains -->
    <div ref="mainSection" class="h-full flex justify-center items-center z-10 relative">
      <div
      :key="animationKey"
        class="grid grid-rows-2 text-center name-popup font-mono
          text-[80px] sm:text-[100px] md:text-[100px] lg:text-[120px] xl:text-[150px] 2xl:text-[200px]
          leading-none"
      >
        <div class="page-title animate-float-in-top">Hi,</div>
        <div class="page-title-i animate-float-in-bottom text-5xl">I'm Bormey</div>

      </div>
    </div>
  </div>
  <About />
  <Projects />
  <!-- <PassionProject /> -->

</template>


<style scoped></style>
