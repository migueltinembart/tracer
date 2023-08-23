import { tenantGroups } from 'db/entities';
import { InferModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { FastifySchema } from 'fastify';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { createPaginationQueryStrings } from 'modules/pagination/apiUtils';

// zod schemas here
const tenantGroupResponseZodSchema = createSelectSchema(tenantGroups);

const tenantGroupCollectionResponseZodSchema = z.array(tenantGroupResponseZodSchema);

const allowedQueryStrings = createPaginationQueryStrings(tenantGroupResponseZodSchema);

const insertTenantGroupZodSchema = createInsertSchema(tenantGroups).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});
const updateTenantGroupZodSchema = createInsertSchema(tenantGroups).omit({ id: true, updatedAt: true, createdAt: true });
const updateTenantGroupsZodSchema = z.array(createInsertSchema(tenantGroups).omit({ createdAt: true, updatedAt: true }));

const myschema: FastifySchema = {
  tags: ['tenant groups'],
};

const getTenantGroupsByIdZodSchema = z
  .object({
    id: z.coerce.number(),
  })
  .describe('Takes an id as a parameter');

export const getTenantGroupSchema: FastifySchema = {
  ...myschema,
  querystring: zodToJsonSchema(allowedQueryStrings),
  response: { 200: zodToJsonSchema(tenantGroupCollectionResponseZodSchema) },
};

export const getByIdSchema: FastifySchema = {
  ...myschema,
  params: zodToJsonSchema(getTenantGroupsByIdZodSchema),
  response: { 200: zodToJsonSchema(tenantGroupResponseZodSchema) },
};

export const postTenantGroupSchema: FastifySchema = {
  ...myschema,
  body: zodToJsonSchema(insertTenantGroupZodSchema),
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
export type AllowedQueryStrings = z.infer<typeof allowedQueryStrings>;
