// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
      apiVersion: process.env.NUXT_PUBLIC_API_VERSION || "api/v1",
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3333/",
      recaptchaSiteKey: process.env.NUXT_RECAPTCHA_SITE_KEY,
      disqus: {
        shortname: "litterarum-1",
      },
    },
  },

  css: ["@splidejs/vue-splide/css"],

  routeRules: {
    // Render these routes with SPA
    "/books/reader/**": { ssr: false },
  },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  modules: [
    "@vueuse/nuxt",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxt/content",
    "@nuxtjs/plausible",
    "nuxt-og-image",
    "@nuxtjs/robots",
    "vue3-carousel-nuxt",
    "nuxt-simple-sitemap",
  ],

  robots: {
    rules: [
      {
        UserAgent: "*",
        Allow: "/",
      },
      {
        Sitemap: `${process.env.NUXT_PUBLIC_SITE_URL}sitemap.xml`,
      },
    ],
  },

  plausible: {
    apiHost: "https://plausible.redania.sbs/",
  },

  ui: {
    icons: ["mdi", "ph"],
  },

  // colorMode: {
  //   preference: 'light'
  // }

  sitemap: {
    exclude: ["/demo", "/search"],
    sources: [
      '/api/__sitemap__/urls',
    ]
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },

  experimental: {
    reactivityTransform: true,
  },

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
    defaultLocale: "es",
    strategy: "no_prefix",
  },
});
