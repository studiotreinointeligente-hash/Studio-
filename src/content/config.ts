import { defineCollection, z } from 'astro:content';

const breadcrumbItem = z.object({
  name: z.string(),
  item: z.string(),
});

const pageSchema = z.object({
  title:         z.string(),
  description:   z.string().default(''),
  urlPath:       z.string(),
  canonical:     z.string().url(),
  type:          z.enum(['pilar','hub','bairro','subpublico','educacional','tier0','tier2','outer']),
  modalidade:    z.enum(['pilates','musculacao','funcional','yoga','krav-maga','geral']),
  andar:         z.enum(['roxo','gold','orange','gray','red','none']).default('none'),
  bairro:        z.string().optional(),
  isYMYL:        z.boolean().default(false),
  schema:        z.union([z.record(z.string(), z.unknown()), z.string()])
                   .transform(v => (typeof v === 'string' ? JSON.parse(v) : v) as Record<string, unknown>),
  breadcrumb:    z.array(breadcrumbItem),
  powerKeywords: z.array(z.string()).optional().default([]),
  h1:            z.string(),
  datePublished: z.string(),
  dateModified:  z.string(),
  lcpImage:      z.string().optional(),
  ogImage:       z.string().optional(),
});

export const collections = {
  pilates:    defineCollection({ type: 'content', schema: pageSchema }),
  musculacao: defineCollection({ type: 'content', schema: pageSchema }),
  funcional:  defineCollection({ type: 'content', schema: pageSchema }),
  yoga:       defineCollection({ type: 'content', schema: pageSchema }),
  'krav-maga':defineCollection({ type: 'content', schema: pageSchema }),
  tier0:      defineCollection({ type: 'content', schema: pageSchema }),
  tier2:      defineCollection({ type: 'content', schema: pageSchema }),
  outer:      defineCollection({ type: 'content', schema: pageSchema }),
};
