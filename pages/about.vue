<script setup lang="ts">
import { ref, onMounted } from "vue";

const isVisible = ref(false);
const activeFace = ref("/images/face-1.png");
const aboutSection = ref<HTMLElement | null>(null);
const faceSwap = ["/images/face-1.png", "/images/face-2.png"];


function cycleFace() {
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * faceSwap.length);
    activeFace.value = faceSwap[randomIndex] ?? faceSwap[0]!
  }, 700);
}

onMounted(() => {
  cycleFace();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible.value = entry.isIntersecting;
      });
    },
    {
      threshold: 0.1,
    }
  );

  const elements = document.querySelectorAll(".about-text");
  elements.forEach((element) => observer.observe(element));
});
</script>

<template>
  <div id="about" ref="aboutSection" class="min-h-screen w-screen bg-stone-50">
    <div class="grid grid-cols-2 lg:grid-cols-3">
      <div class="col-span-3 h-[10rem] ml-6 lg:ml-16">
        <div class="about-text">About</div>
      </div>
      <div
        class="col-span-1 bg-blue-300 w-fit pr-12 lg:pr-36 about-text ml-6 lg:ml-16 md:mt-8"
      >
        me
      </div>
      <div class="font-playfair cols-span-3 md:mt-36 -ml-4 mt-30 mr-10">
        I'm a computer science graduate with a focus on AI and research - mostly the kind spoken by humans, 
        not machines (though I’ve spent plenty of time with both). I also have side passion for web/app development, 
        and you can pay them a visit in the project section also.
        <br />
        <br/>
        Also has a deep appreciation for animals, slow mornings, and projects that feel like they matter - even just a little. 
         Just here, building things one piece at a time.

      </div>
      <div class="col-span-1 hidden lg:block md:scale-0.5">
        <NuxtImg src="/images/portrait.jpeg" class="h-[30rem]" />
      </div>
    </div>

    <div
      class="relative -mt-24 -ml-8 bottom-[5rem] left-1/2 -translate-x-1/2 flex transition-all duration-1000 animate-float-in-bottom"
      :class="
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[5%] opacity-0'
      "
    >
      <NuxtImg :src="activeFace" class="h-[20rem] lg:ml-11" />

      <!-- Blue div -->
      <div
        class="absolute top-[170px] lg:left-30 left-20 w-[10rem] h-[5rem] z-10 bg-blue-300"
      >
        <!-- Left hand -->
        <div
          class="absolute -top-[14px] left-[15%] w-[30px] h-[20px] bg-orange-200 z-20"
        ></div>

        <!-- Right hand -->
        <div
          class="absolute -top-[14px] right-[15%] w-[30px] h-[20px] bg-orange-200 z-20"
        ></div>
      </div>
    </div>
    <div class="w-full h-[19rem] -mt-57 bg-stone-50 relative z-20"></div>
  </div>

  
</template>
