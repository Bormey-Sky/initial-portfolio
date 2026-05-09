import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: 'articles/**/*.md',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        tag: z.string(),
        date: z.string(),
        subtitle: z.string(),
        type: z.string().optional(),
        pdf: z.string().optional(),
        summary: z.string(),
      }),
    }),
    notebooks: defineCollection({
      type: 'page',
      source: 'notebooks/**/*.md',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        subtitle: z.string().optional(),
        tag: z.string(),
        date: z.string().optional(),
        type: z.string().optional(),
        pdf: z.string().optional(),
        summary: z.string().optional(),
      }),
    }),
  },
})