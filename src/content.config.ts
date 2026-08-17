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
    // Optional. Facts for the site's chat assistant that the post's own opening
    // doesn't carry — the payoff numbers, the actual definition. Left out, the
    // generator summarises from the opening paragraphs instead.
    botNotes: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    status: z.enum(['live', 'building', 'archived']).default('building'),
    year: z.string(),
    url: z.string().optional(),
    repo: z.string().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, projects };
