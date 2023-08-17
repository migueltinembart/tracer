import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { tenants } from 'db/entities';
import { FastifySchema, RequestGenericInterface } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { nullable, z } from 'zod';
import { InferModel } from 'drizzle-orm';
// zod schemas here

const tenantResponseZodSchema = createSelectSchema(tenants);
const tenantCollectionResponseZodSchema = z.array(tenantResponseZodSchema);
const insertTenantZodSchema = createInsertSchema(tenants, {
  id: z.void(),
  updatedAt: z.void(),
  createdAt: z.void(),
});
const updateTenantsZodSchema = z.array(insertTenantZodSchema);
const updateTenantZodSchema = createInsertSchema(tenants, { id: z.void(), updatedAt: z.void(), createdAt: z.void() });

const myschema: FastifySchema = {
  tags: ['tenants'],
};

const allowedQuerystrings = z
  .object({
    limit: z.coerce.number().optional(),
  })
  .describe('Allowed querystrings');

const getTenantsByIdZodSchema = z
  .object({
    id: z.coerce.number().optional(),
  })
  .describe('Takes an id as a parameter');

export const getTenantsSchema: FastifySchema = {
  ...myschema,
  querystring: zodToJsonSchema(allowedQuerystrings),
  response: { 200: zodToJsonSchema(tenantCollectionResponseZodSchema) },
};

export const getByIdSchema: FastifySchema = {
  ...myschema,
  params: zodToJsonSchema(getTenantsByIdZodSchema),
  response: { 200: zodToJsonSchema(tenantResponseZodSchema) },
};

export const postTenantSchema: FastifySchema = {
  ...myschema,
  body: zodToJsonSchema(insertTenantZodSchema),
  response: { 201: zodToJsonSchema(tenantResponseZodSchema) },
};

export const putTenantsSchema: FastifySchema = {
  ...myschema,
  body: zodToJsonSchema(updateTenantsZodSchema),
  response: { 200: zodToJsonSchema(tenantCollectionResponseZodSchema) },
};

export const putTenantSchema: FastifySchema = {
  ...myschema,
  params: zodToJsonSchema(getTenantsByIdZodSchema),
  body: zodToJsonSchema(updateTenantZodSchema),
  response: { 200: zodToJsonSchema(tenantResponseZodSchema) },
};

export const deleteTenantSchema: FastifySchema = {
  ...myschema,
  params: zodToJsonSchema(getTenantsByIdZodSchema),
  response: {
    204: {
      description: 'Successfully deleted tenant',
      type: 'null',
    },
  },
};

export type SelectTenantsInterface = InferModel<typeof tenants>;
export type InsertTenantsInterface = InferModel<typeof tenants, 'insert'>;
export type AllowedQueryStrings = z.infer<typeof allowedQuerystrings>;
