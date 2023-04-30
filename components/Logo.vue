<script setup lang="ts">
const app = useAppConfig();
</script>
>
<template>
  <NuxtLink
    tag="a"
    class="mr-3 flex-none overflow-hidden md:w-auto text-md font-bold text-gray-900 dark:text-gray-200"
    to="/"
    :class="$attrs.class"
  >
    <span class="sr-only">home</span>
    <span class="flex items-center">
      <Icon
        name="simple-icons:nuxtdotjs"
        class="inline-block mr-2 text-lg text-primary-500"
      />
      {{ app.name }}
    </span>
  </NuxtLink>
</template>
