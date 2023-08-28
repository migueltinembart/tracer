import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { siteGroups } from 'db/entities';
import { FastifySchema } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { z } from 'zod';
import { InferModel } from 'drizzle-orm';
import { createPaginationQueryStrings } from 'modules/REST/pagination/apiUtils';
// zod schemas here

const siteGroupResponseZodSchema = createSelectSchema(siteGroups);

const siteGroupCollectionResponseZodSchema = z.array(siteGroupResponseZodSchema);

export const allowedQueryStrings = createPaginationQueryStrings(siteGroupResponseZodSchema);

const insertsiteGroupZodSchema = createInsertSchema(siteGroups).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});

const updateSiteGroupZodSchema = createInsertSchema(siteGroups).omit({ id: true, updatedAt: true, createdAt: true });
const updateSiteGroupsZodSchema = z.array(createInsertSchema(siteGroups).omit({ createdAt: true, updatedAt: true }));

const myschema: FastifySchema = {
  tags: ['Site Groups'],
};

const getSiteGroupsByIdZodSchema = z
  .object({
    id: z.coerce.number(),
  })
  .describe('Takes an id as a parameter');

export const getSiteGroupSchema: FastifySchema = {
  ...myschema,
  querystring: zodToJsonSchema(allowedQueryStrings),
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
export type AllowedQueryStrings = z.infer<typeof allowedQueryStrings>;
