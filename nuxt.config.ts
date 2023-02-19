// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true,
    typeCheck: true,
  },

  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@nuxt/content",
    "@nuxt/image-edge",
    "nuxt-icon"
  ],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },

  experimental: {
    reactivityTransform: true,
  },
  // build: {
  //   transpile: ['@headlessui/vue'],
  // },

  i18n: {
    locales: [
      {
        code: "en",
        file: "en.json",
      },
      {
        code: "es",
        file: "es.json",
      },
    ],
    // lazy: true,
    langDir: "locales",
    defaultLocale: "en",
  },
});
