// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "motion-v/nuxt"],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.scss",
  },
});
