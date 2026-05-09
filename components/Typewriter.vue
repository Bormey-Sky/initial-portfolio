<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps<{
  phrase: string;
  typo?: boolean;
  typeSpeed?: number;
  restart?: boolean;
  stopAfter?: boolean;
}>();

const displayText = ref("");
const cleanTypedText = ref(""); // actual typed string without glitch char
const isDeleting = ref(false);
const typeSpeed = props.typeSpeed ?? 100; // default typing speed
const typoChance = 0.3; // chance of a glitch character being added
const hasTypo = ref(false);
const typoFixed = ref(false);
const stopped = ref(false);

const glitchChars =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:',.<>?/~`";

function getRandomGlitchChar(): string {
  return glitchChars[Math.floor(Math.random() * glitchChars.length)] ?? ''
}

function typeWord() {
  if (stopped.value) return;

  const targetText = props.phrase;
  const nextCharIndex = cleanTypedText.value.length;
  let delay = isDeleting.value ? 50 : typeSpeed;

  if (isDeleting.value) {
    cleanTypedText.value = targetText.substring(0, nextCharIndex - 1);
    displayText.value = cleanTypedText.value;

    if (cleanTypedText.value === "") {
      isDeleting.value = false;
      typoFixed.value = false;

      if (!props.restart) {
        stopped.value = true;
        return;
      }

      delay = 500;
    }

  } else {
    // Typo logic (only if typo is enabled)
    if (
      props.typo &&
      !hasTypo.value &&
      Math.random() < 0.3 &&
      nextCharIndex > 3 &&
      !typoFixed.value
    ) {
      displayText.value = cleanTypedText.value + getRandomGlitchChar();
      hasTypo.value = true;

      setTimeout(() => {
        displayText.value = cleanTypedText.value;
        hasTypo.value = false;
        typoFixed.value = true;
        typeWord(); // resume typing
      }, 1000);

      return;
    }

    // Continue typing
    if (nextCharIndex < targetText.length - 1) {
      cleanTypedText.value = targetText.substring(0, nextCharIndex + 1);
      displayText.value = cleanTypedText.value;
    } else if (nextCharIndex < targetText.length) {
      cleanTypedText.value = targetText;
      displayText.value = cleanTypedText.value + getRandomGlitchChar();
    }

    // Done typing
    if (cleanTypedText.value === targetText) {
      delay = 1000;

      if (props.stopAfter) {
        stopped.value = true;
        return;
      }

      isDeleting.value = props.restart;
    }
  }

  setTimeout(typeWord, delay);
}


onMounted(() => {
  typeWord();
});
</script>

<template>
  <div class="">
    <span
      class="font-mono inline-block overflow-hidden border-r-8 animate-blink pr-1 min-w-[1ch]"
    >
      {{ displayText }}
    </span>
  </div>
</template>
