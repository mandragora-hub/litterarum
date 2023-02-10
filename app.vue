<script lang="ts" setup>
import { AppConfigInput } from "@nuxt/schema";
const app = useAppConfig() as AppConfigInput;
const { locale } = useLocale();

useHead({
  title: app.name,
  titleTemplate: "%s - Nuxt 3 Litterarum",
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      hid: "description",
      name: "description",
      content: "Nuxt 3 Litterarum",
    },
    {
      name: "theme-color",
      content: computed(() => (isDark.value ? "#00aba9" : "#ffffff")),
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: computed(() =>
        preferredDark.value ? "/favicon-dark.svg" : "/favicon.svg"
      ),
    },
  ],
});
</script>

<template>
  <Html :class="`${isDark ? 'dark' : ''}`" :lang="locale">
    <Body
      class="antialiased duration-300 transition-colors text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900"
    >
      <NuxtLayout>
        <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
