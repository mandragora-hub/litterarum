<script setup lang="ts">
import type { Book } from "~/types";

defineProps<{
  item?: Book;
}>();

const target = ref<HTMLElement | null>(null);
const targetIsVisible = useElementVisibility(target);
watch(targetIsVisible, (isVisible) => setSearchBarOnNavbar(!isVisible));
// onMounted(() => setSearchBarOnNavbar(!targetIsVisible));
</script>

<template>
  <section ref="target" class="max-w-screen-xl px-4 py-8 mx-auto lg:py-16">
    <div class="flex flex-col items-center text-center">
      <h1
        class="uppercase max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
      >
        <span
          class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
        >
          {{ $t("components.hero.header") }}
        </span>
      </h1>
      <p
        class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
      >
        {{ $t("components.hero.subtitle") }}
      </p>

      <SearchBar size="lg" />
      <!-- <a
        href="#"
        class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
      >
        Search
      </a> -->
      <NuxtLink to="local" class="mt-24 py-2">
        <UIcon
          class="animate-bounce"
          name="i-ph-arrow-bend-left-down"
          size="1.5em"
        />
      </NuxtLink>
    </div>
  </section>
</template>
