<script setup lang="ts">
defineProps<{
  rating?: number;
  reviews?: number;
}>();
</script>

<template>
  <div class="flex items-center" :class="$attrs.class">
    <Icon v-if="rating" name="ph:star-fill" class="text-yellow-500" />
    <Icon v-else name="ph:star" class="text-yellow-500" />
    <p class="ml-2 font-bold dark:text-white">
      {{ rating || 0 }}
    </p>
    <span
      class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"
    ></span>
    <NuxtLink
      to="#"
      class="font-normal text-gray-700 underline hover:no-underline dark:text-white"
      >{{ reviews || 0 }} reviews</NuxtLink
    >
  </div>
</template>
