import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { tenantGroups } from 'db/entities';
import { FastifySchema, RequestGenericInterface } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { nullable, z } from 'zod';
import { InferModel } from 'drizzle-orm';
// zod schemas here

const tenantGroupResponseZodSchema = createSelectSchema(tenantGroups);
const tenantGroupCollectionResponseZodSchema = z.array(tenantGroupResponseZodSchema);
const inserttenantGroupZodSchema = createInsertSchema(tenantGroups, {
  id: z.void(),
  updatedAt: z.void(),
  createdAt: z.void(),
});
const updateTenantGroupsZodSchema = z.array(inserttenantGroupZodSchema);
const updateTenantGroupZodSchema = createInsertSchema(tenantGroups, {
  id: z.void(),
  updatedAt: z.void(),
  createdAt: z.void(),
});

const myschema: FastifySchema = {
  tags: ['tenant groups'],
};

const allowedQuerystrings = z
  .object({
    limit: z.coerce.number().optional(),
  })
  .describe('Allowed querystrings');

const getTenantGroupsByIdZodSchema = z
  .object({
    id: z.coerce.number(),
  })
  .describe('Takes an id as a parameter');

export const getTenantGroupSchema: FastifySchema = {
  ...myschema,
  querystring: zodToJsonSchema(allowedQuerystrings),
  response: { 200: zodToJsonSchema(tenantGroupCollectionResponseZodSchema) },
};

export const getByIdSchema: FastifySchema = {
  ...myschema,
  params: zodToJsonSchema(getTenantGroupsByIdZodSchema),
  response: { 200: zodToJsonSchema(tenantGroupResponseZodSchema) },
};

export const postTenantGroupSchema: FastifySchema = {
  ...myschema,
  body: zodToJsonSchema(inserttenantGroupZodSchema),
  response: { 201: zodToJsonSchema(tenantGroupResponseZodSchema) },
};

export const putTenantGroupsSchema: FastifySchema = {
  ...myschema,
  body: zodToJsonSchema(updateTenantGroupsZodSchema),
  response: { 200: zodToJsonSchema(tenantGroupCollectionResponseZodSchema) },
};

export const putTenantGroupSchema: FastifySchema = {
  ...myschema,
  params: zodToJsonSchema(getTenantGroupsByIdZodSchema),
  body: zodToJsonSchema(updateTenantGroupZodSchema),
  response: { 200: zodToJsonSchema(tenantGroupResponseZodSchema) },
};

export const deleteTenantGroupSchema: FastifySchema = {
  ...myschema,
  params: zodToJsonSchema(getTenantGroupsByIdZodSchema),
  response: {
    204: {
      description: 'Successfully deleted tenantGroup',
      type: 'null',
    },
  },
};

export type SelectTenantGroupsInterface = InferModel<typeof tenantGroups>;
export type InsertTenantGroupsInterface = InferModel<typeof tenantGroups, 'insert'>;
export type AllowedQueryStrings = z.infer<typeof allowedQuerystrings>;
