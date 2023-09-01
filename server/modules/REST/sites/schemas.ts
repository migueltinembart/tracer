import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { sites } from 'db/entities';
import { FastifySchema, RequestGenericInterface } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { z } from 'zod';
import { InferModel } from 'drizzle-orm';
import { createPaginationQueryStrings } from 'modules/REST/pagination/apiUtils';

// zod schemas here

const siteResponseZodSchema = createSelectSchema(sites);

const siteCollectionResponseZodSchema = z.array(siteResponseZodSchema);

export const allowedQueryStrings = createPaginationQueryStrings(siteResponseZodSchema);

export const insertSiteZodSchema = createInsertSchema(sites).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});
export const updateSiteZodSchema = createInsertSchema(sites).omit({ id: true, updatedAt: true, createdAt: true });
export const updateSitesZodSchema = z.array(createInsertSchema(sites).omit({ createdAt: true, updatedAt: true }));

const swaggerOpts: FastifySchema = {
  tags: ['Sites'],
};

const getSitesByIdZodSchema = z
  .object({
    id: z.coerce.number(),
  })
  .describe('Takes an id as a parameter');

export const getSitesSchema: FastifySchema = {
  ...swaggerOpts,
  querystring: zodToJsonSchema(allowedQueryStrings),
  response: { 200: zodToJsonSchema(siteCollectionResponseZodSchema) },
};

export const getByIdSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getSitesByIdZodSchema),
  response: { 200: zodToJsonSchema(siteResponseZodSchema) },
};

export const postSiteSchema: FastifySchema = {
  ...swaggerOpts,
  body: zodToJsonSchema(insertSiteZodSchema),
  response: { 201: zodToJsonSchema(siteResponseZodSchema) },
};

export const putSitesSchema: FastifySchema = {
  ...swaggerOpts,
  body: zodToJsonSchema(updateSitesZodSchema),
  response: { 200: zodToJsonSchema(siteCollectionResponseZodSchema) },
};

export const putSiteSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getSitesByIdZodSchema),
  body: zodToJsonSchema(updateSiteZodSchema),
  response: { 200: zodToJsonSchema(siteResponseZodSchema) },
};

export const deleteSiteSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getSitesByIdZodSchema),
  response: {
    204: {
      description: 'Successfully deleted site',
      type: 'null',
    },
  },
};

export type SelectSitesInterface = InferModel<typeof sites>;
export type InsertSitesInterface = InferModel<typeof sites, 'insert'>;
export type AllowedQueryStrings = z.infer<typeof allowedQueryStrings>;
