import { sites, statusEnum } from 'db/entities';
import { InferModel } from 'drizzle-orm';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { string, z } from 'zod';
import { FastifySchema } from 'fastify';

// zod schemas here
export const responseZodSchema = z
  .object({
    sites: z.object({
      id: z.string().uuid(),
      name: z.string(),
      status: z.enum([...statusEnum.enumValues]),
      comment: z.string().optional(),
    }),
    comments: z.object({
      id: z.string().uuid(),
      content: z.string(),
    }),
  })
  .describe('Standard response returns database entity');

export const responseManyZodSchema = z.array(
  z
    .object({
    sites: z.object({
      id: z.string().uuid(),
      name: z.string(),
      status: z.enum([...statusEnum.enumValues]),
      comment: z.string().optional(),
    }),
    comments: z.object({
      id: z.string().uuid(),
      content: z.string(),
    }),
  })
    .describe('Standard response returns many database entities')
);

export const getSitesByNameZodSchema = z
  .object({
    name: z.string(),
  })
  .describe('if name is present, returns specified site');

export const getSiteByIdZodSchema = z
  .object({
    id: string(),
  })
  .describe('returns specified site based on provided ID');

export const createSiteZodSchema = z
  .object({
    name: z.string(),
    status: z.enum([...statusEnum.enumValues]),
    comment: z.string().optional(),
  })
  .describe('Creates a site if supplied with a name and a status');

export const updateSiteZodSchema = z
  .object({
    id: z.string().uuid('Must provide uuid'),
    name: z.string().optional(),
    status: z.enum([...statusEnum.enumValues]).optional(),
  })
  .describe('updates a site based on ');

export const deleteSiteZodSchema = z.object({
  id: z.string().uuid('Must provide uuid'),
});

// infered types here => needed for Generic interface Fastify Request to type request correctly
export type SitesInsertInterface = InferModel<typeof sites, 'insert'>;
export type SitesInterface = InferModel<typeof sites>;

// Json Schemas generated here
export const getSiteByNameJsonSchema: FastifySchema = {
  body: zodToJsonSchema(getSitesByNameZodSchema),
};

export const getSiteByIdJsonSchema: FastifySchema = {
  params: zodToJsonSchema(getSiteByIdZodSchema),
  response: {
    200: zodToJsonSchema(responseZodSchema),
  },
};

export const createSiteJsonSchema: FastifySchema = {
  body: zodToJsonSchema(createSiteZodSchema),
};

export const updateSiteJsonSchema: FastifySchema = {
  body: zodToJsonSchema(updateSiteZodSchema),
  response: {
    202: zodToJsonSchema(responseZodSchema),
  },
};

export const deleteSiteJsonSchema: FastifySchema = {
  body: zodToJsonSchema(deleteSiteZodSchema),
};
