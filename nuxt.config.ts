// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "nuxt-primevue",
    "@vee-validate/nuxt",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/color-mode",
  ],
  primevue: {
    usePrimeVue: true,
    options: { ripple: false, unstyled: true },
  },
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      ErrorMessage: "ErrorMessage",
    },
  },

  css: [
    "/node_modules/primeflex/primeflex.css",
    "primeicons/primeicons.css",
    "~/assets/scss/base.scss",
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/main.scss" as *;',
        },
      },
    },
  },

  build: {
    transpile: ["primevue"],
  },
  ssr: false,
});
