// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL || 'http://localhost:8080/smartPackage/api'
    }
  },
  css: ['~/assets/css/input.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  build:{
    transpile: ['vue-toastification']
  },
  app: {
    head: {
      htmlAttrs: {
        class:"dark",
      },
    }
  },
})
