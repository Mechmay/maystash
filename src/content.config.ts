import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/posts' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    date: z.coerce.date(),
    chapter: z.string(),
    tags: z.array(z.string()).default([]),
    section: z.enum(['feature', 'matinee']).default('feature'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
