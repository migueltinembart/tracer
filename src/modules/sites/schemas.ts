import { sites, statusEnum } from 'db/entities';
import { InferModel } from 'drizzle-orm';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { string, z } from 'zod';
import { FastifySchema } from 'fastify';

// zod schemas here
const getSitesByNameZodSchema = z.object({
  name: z.string(),
});

const getSiteByIdZodSchema = z.object({
  id: string(),
});

const createSiteZodSchema = z
  .object({
    name: z.string().min(4),
    status: z.enum([...statusEnum.enumValues]),
  })
  .describe('Creates a site if supplied with a name and ');

const updateSiteZodSchema = z.object({
  id: z.string().uuid('Must provide uuid'),
  name: z.string().optional(),
  status: z.enum([...statusEnum.enumValues]).optional(),
});

const deleteSiteZodSchema = z.object({
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
};

export const createSiteJsonSchema = {
  body: zodToJsonSchema(createSiteZodSchema),
};

export const updateSiteJsonSchema: FastifySchema = {
  body: zodToJsonSchema(updateSiteZodSchema),
};

export const deleteSiteJsonSchema: FastifySchema = {
  body: zodToJsonSchema(deleteSiteZodSchema),
};
