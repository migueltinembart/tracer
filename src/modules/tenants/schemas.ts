import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { tenants } from 'db/entities';
import { FastifySchema } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { z } from 'zod';
import { InferModel } from 'drizzle-orm';
import { createPaginationQueryStrings } from 'modules/pagination/apiUtils';
const tenantResponseZodSchema = createSelectSchema(tenants);

const tenantCollectionResponseZodSchema = z.array(tenantResponseZodSchema);

const allowedQueryStrings = createPaginationQueryStrings(tenantResponseZodSchema);

const insertTenantZodSchema = createInsertSchema(tenants).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});

const updateTenantZodSchema = createInsertSchema(tenants).omit({ id: true, updatedAt: true, createdAt: true });

const updateTenantsZodSchema = z.array(createInsertSchema(tenants).omit({ createdAt: true, updatedAt: true }));

const myschema: FastifySchema = {
  tags: ['tenants'],
};

const getTenantsByIdZodSchema = z
  .object({
    id: z.coerce.number().optional(),
  })
  .describe('Takes an id as a parameter');

export const getTenantsSchema: FastifySchema = {
  ...myschema,
  querystring: zodToJsonSchema(allowedQueryStrings),
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
export type AllowedQueryStrings = z.infer<typeof allowedQueryStrings>;
