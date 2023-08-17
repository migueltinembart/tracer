import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { siteGroups } from 'db/entities';
import { FastifySchema, RequestGenericInterface } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { nullable, z } from 'zod';
import { InferModel } from 'drizzle-orm';
// zod schemas here

const siteGroupResponseZodSchema = createSelectSchema(siteGroups);
const siteGroupCollectionResponseZodSchema = z.array(siteGroupResponseZodSchema);
const insertsiteGroupZodSchema = createInsertSchema(siteGroups, {
  id: z.void(),
  updatedAt: z.void(),
  createdAt: z.void(),
});
const updateSiteGroupsZodSchema = z.array(insertsiteGroupZodSchema);
const updateSiteGroupZodSchema = createInsertSchema(siteGroups, {
  id: z.void(),
  updatedAt: z.void(),
  createdAt: z.void(),
});

const myschema: FastifySchema = {
  tags: ['site groups'],
};

const allowedQuerystrings = z
  .object({
    limit: z.coerce.number().optional(),
  })
  .describe('Allowed querystrings');

const getSiteGroupsByIdZodSchema = z
  .object({
    id: z.coerce.number(),
  })
  .describe('Takes an id as a parameter');

export const getSiteGroupSchema: FastifySchema = {
  ...myschema,
  querystring: zodToJsonSchema(allowedQuerystrings),
  response: { 200: zodToJsonSchema(siteGroupCollectionResponseZodSchema) },
};

export const getByIdSchema: FastifySchema = {
  ...myschema,
  params: zodToJsonSchema(getSiteGroupsByIdZodSchema),
  response: { 200: zodToJsonSchema(siteGroupResponseZodSchema) },
};

export const postSiteGroupSchema: FastifySchema = {
  ...myschema,
  body: zodToJsonSchema(insertsiteGroupZodSchema),
  response: { 201: zodToJsonSchema(siteGroupResponseZodSchema) },
};

export const putSiteGroupsSchema: FastifySchema = {
  ...myschema,
  body: zodToJsonSchema(updateSiteGroupsZodSchema),
  response: { 200: zodToJsonSchema(siteGroupCollectionResponseZodSchema) },
};

export const putSiteGroupSchema: FastifySchema = {
  ...myschema,
  params: zodToJsonSchema(getSiteGroupsByIdZodSchema),
  body: zodToJsonSchema(updateSiteGroupZodSchema),
  response: { 200: zodToJsonSchema(siteGroupResponseZodSchema) },
};

export const deleteSiteGroupSchema: FastifySchema = {
  ...myschema,
  params: zodToJsonSchema(getSiteGroupsByIdZodSchema),
  response: {
    204: {
      description: 'Successfully deleted siteGroup',
      type: 'null',
    },
  },
};

export type SelectSiteGroupsInterface = InferModel<typeof siteGroups>;
export type InsertSiteGroupsInterface = InferModel<typeof siteGroups, 'insert'>;
export type AllowedQueryStrings = z.infer<typeof allowedQuerystrings>;
