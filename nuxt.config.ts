export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  ssr: false,
  devtools: { enabled: true },

  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: ["~/assets/css/tailwind.css"],
  modules: [
    "nuxt-icons",
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@sidebase/nuxt-auth",
  ],
  auth: {
    globalAppMiddleware: true,
  },
  app: {
    head: {
      title: "Bukaka - Test",
    },
  },
  runtimeConfig: {
    // Public keys that are exposed to the client
    public: {
      baseURLService: process.env.BASE_URL_API_SERVICE,
      baseURL: process.env.BASE_URL,
    },
  },
});
