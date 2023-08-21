import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { sites } from 'db/entities';
import { FastifySchema, RequestGenericInterface } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { z } from 'zod';
import { InferModel } from 'drizzle-orm';
import { createPaginationQueryStrings } from 'modules/pagination/apiUtils';

// zod schemas here

const siteResponseZodSchema = createSelectSchema(sites);

const siteCollectionResponseZodSchema = z.array(siteResponseZodSchema);

export const allowedQueryStrings = createPaginationQueryStrings(siteResponseZodSchema);

const insertSiteZodSchema = createInsertSchema(sites).omit({
  updatedAt: true,
  createdAt: true,
});
const updateSiteZodSchema = createInsertSchema(sites).omit({ updatedAt: true, createdAt: true });
const updateSitesZodSchema = z.array(updateSiteZodSchema);

const myschema: FastifySchema = {
  tags: ['sites'],
};

const getSitesByIdZodSchema = z
  .object({
    id: z.coerce.number(),
  })
  .describe('Takes an id as a parameter');

export const getSitesSchema: FastifySchema = {
  ...myschema,
  querystring: zodToJsonSchema(allowedQueryStrings),
  response: { 200: zodToJsonSchema(siteCollectionResponseZodSchema) },
};

export const getByIdSchema: FastifySchema = {
  ...myschema,
  params: zodToJsonSchema(getSitesByIdZodSchema),
  response: { 200: zodToJsonSchema(siteResponseZodSchema) },
};

export const postSiteSchema: FastifySchema = {
  ...myschema,
  body: zodToJsonSchema(insertSiteZodSchema),
  response: { 201: zodToJsonSchema(siteResponseZodSchema) },
};

export const putSitesSchema: FastifySchema = {
  ...myschema,
  body: zodToJsonSchema(updateSitesZodSchema),
  response: { 200: zodToJsonSchema(siteCollectionResponseZodSchema) },
};

export const putSiteSchema: FastifySchema = {
  ...myschema,
  params: zodToJsonSchema(getSitesByIdZodSchema),
  body: zodToJsonSchema(updateSiteZodSchema),
  response: { 200: zodToJsonSchema(siteResponseZodSchema) },
};

export const deleteSiteSchema: FastifySchema = {
  ...myschema,
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
