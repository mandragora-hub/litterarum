<script lang="ts" setup>
import p from "../package.json";
const app = useAppConfig();
</script>

<template>
  <footer class="border-t lg:border-gray-900/10 dark:border-gray-50/[0.2]">
    <Container class="py-4 text-center md:text-left">
      <NuxtLink to="/demo">
        <div class="flex items-center gap-x-2 mb-1">
          {{ app.name }}
          <UIcon name="i-ph-egg-crack-duotone" class="text-xl" />
        </div>
      </NuxtLink>
      <div class="text-xs text-gray-600 dark:text-gray-400">
        Copyright © {{ new Date().getFullYear() }}
        <a :href="app.author.link">{{ app.author.name }}</a
        >. All rights reserved. Made with <span class="text-red-500">❤</span>
        <div
          class="flex flex-col md:flex-row space-x-2 items-center md:float-right"
        >
          <span class="text-center md:text-right">
            design by
            <a href="https://github.com/mandragora-hub">mandragora-hub</a>
          </span>
          <span
            class="block bg-blue-500 rounded px-1 py-0.5 text-white text-xs"
          >
            {{ p.devDependencies.nuxt }}
          </span>
        </div>
      </div>
    </Container>
  </footer>
</template>
