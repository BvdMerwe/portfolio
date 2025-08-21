import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    companies: defineCollection({
      type: "page",
      source: "companies/**/*.md",
      schema: z.object({
        path: z.string(),
        name: z.string(),
        url: z.string().nullable(),
        logo: z.object({
          light: z.string(),
          dark: z.string(),
        }),
        position: z.string(),
        start: z.date(),
        end: z.date().nullable(),
      }),
    }),
    work: defineCollection({
      type: "page",
      source: "work/**/*.md",
      schema: z.object({
        name: z.string(),
        company: z.string(),
        tools: z.array(z.string()),
      }),
    }),
  },
});
