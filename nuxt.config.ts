// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2025-03-23",
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      APP_ENV: 'registration'
    }
  }
})

