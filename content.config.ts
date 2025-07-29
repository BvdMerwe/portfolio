import { defineContentConfig, defineCollection } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    companies: defineCollection({
      type: "page",
      source: "companies/**/*.md",
    }),
    work: defineCollection({
      type: "page",
      source: "work/**/*.md",
    }),
  },
});
