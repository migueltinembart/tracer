import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { deviceTemplates } from 'db/deviceManagement';
import { FastifySchema } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { any, z } from 'zod';
import { InferModel } from 'drizzle-orm';
import { createPaginationQueryStrings } from 'modules/pagination/apiUtils';

// zod schemas here

const deviceTemplateResponseZodSchema = createSelectSchema(deviceTemplates, { template: z.any() });

const deviceTemplateCollectionResponseZodSchema = z.array(deviceTemplateResponseZodSchema);

export const allowedQueryStrings = createPaginationQueryStrings(deviceTemplateResponseZodSchema);

const insertDeviceTemplateZodSchema = createInsertSchema(deviceTemplates, {
  template: z.record(z.string(), z.string()),
}).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});
const updateDeviceTemplateZodSchema = createInsertSchema(deviceTemplates, { template: z.any() }).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});
const updateDeviceTemplatesZodSchema = z.array(
  createInsertSchema(deviceTemplates, { template: z.record(z.any(), z.any()) }).omit({
    createdAt: true,
    updatedAt: true,
  })
);

const swaggerOpts: FastifySchema = {
  tags: ['Device Templates'],
};

const getDeviceTemplatesByIdZodSchema = z
  .object({
    id: z.coerce.number(),
  })
  .describe('Takes an id as a parameter');

export const getDeviceTemplatesSchema: FastifySchema = {
  ...swaggerOpts,
  querystring: zodToJsonSchema(allowedQueryStrings),
  response: { 200: zodToJsonSchema(deviceTemplateCollectionResponseZodSchema) },
};

export const getByIdSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getDeviceTemplatesByIdZodSchema),
  response: { 200: zodToJsonSchema(deviceTemplateResponseZodSchema) },
};

export const postDeviceTemplateSchema: FastifySchema = {
  ...swaggerOpts,
  body: zodToJsonSchema(insertDeviceTemplateZodSchema),
  response: {200: zodToJsonSchema(deviceTemplateResponseZodSchema)}
};

export const putDeviceTemplatesSchema: FastifySchema = {
  ...swaggerOpts,
  body: zodToJsonSchema(updateDeviceTemplatesZodSchema),
  response: { 200: zodToJsonSchema(deviceTemplateCollectionResponseZodSchema) },
};

export const putDeviceTemplateSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getDeviceTemplatesByIdZodSchema),
  body: zodToJsonSchema(updateDeviceTemplateZodSchema),
  response: { 200: zodToJsonSchema(deviceTemplateResponseZodSchema) },
};

export const deleteDeviceTemplateSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getDeviceTemplatesByIdZodSchema),
  response: {
    204: {
      description: 'Successfully deleted deviceTemplate',
      type: 'null',
    },
  },
};

export type SelectDeviceTemplatesInterface = InferModel<typeof deviceTemplates>;
export type InsertDeviceTemplatesInterface = InferModel<typeof deviceTemplates, 'insert'>;
export type AllowedQueryStrings = z.infer<typeof allowedQueryStrings>;
