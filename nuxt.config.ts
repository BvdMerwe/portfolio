// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "motion-v/nuxt"],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.scss",
  },
  content: {
    renderer: {
      anchorLinks: { h2: false, h3: false, h4: false },
    },
  },
  app: {
    head: {
      bodyAttrs: {
        class: "no-animation styled",
      },
      style: [
        {
          textContent:
            ".no-animation, .no-animation * { transition-duration: 0; opacity: 0; visibility: hidden; background: black; transition: all; }",
        },
      ],
    },
  },
});
