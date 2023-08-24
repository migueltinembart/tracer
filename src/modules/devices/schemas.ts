import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { devices } from 'db/deviceManagement';
import { FastifySchema, RequestGenericInterface } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { z } from 'zod';
import { InferModel } from 'drizzle-orm';
import { createPaginationQueryStrings } from 'modules/pagination/apiUtils';

// zod schemas here

const deviceResponseZodSchema = createSelectSchema(devices);

const deviceCollectionResponseZodSchema = z.array(deviceResponseZodSchema);

export const allowedQueryStrings = createPaginationQueryStrings(deviceResponseZodSchema);

const insertDeviceZodSchema = createInsertSchema(devices).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});
const updateDeviceZodSchema = createInsertSchema(devices).omit({ id: true, updatedAt: true, createdAt: true });
const updateDevicesZodSchema = z.array(createInsertSchema(devices).omit({ createdAt: true, updatedAt: true }));

const swaggerOpts: FastifySchema = {
  tags: ['devices'],
};

const getDevicesByIdZodSchema = z
  .object({
    id: z.coerce.number(),
  })
  .describe('Takes an id as a parameter');

export const getDevicesSchema: FastifySchema = {
  ...swaggerOpts,
  querystring: zodToJsonSchema(allowedQueryStrings),
  response: { 200: zodToJsonSchema(deviceCollectionResponseZodSchema) },
};

export const getByIdSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getDevicesByIdZodSchema),
  response: { 200: zodToJsonSchema(deviceResponseZodSchema) },
};

export const postDeviceSchema: FastifySchema = {
  ...swaggerOpts,
  body: zodToJsonSchema(insertDeviceZodSchema),
  response: { 201: zodToJsonSchema(deviceResponseZodSchema) },
};

export const putDevicesSchema: FastifySchema = {
  ...swaggerOpts,
  body: zodToJsonSchema(updateDevicesZodSchema),
  response: { 200: zodToJsonSchema(deviceCollectionResponseZodSchema) },
};

export const putDeviceSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getDevicesByIdZodSchema),
  body: zodToJsonSchema(updateDeviceZodSchema),
  response: { 200: zodToJsonSchema(deviceResponseZodSchema) },
};

export const deleteDeviceSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getDevicesByIdZodSchema),
  response: {
    204: {
      description: 'Successfully deleted device',
      type: 'null',
    },
  },
};

export type SelectDevicesInterface = InferModel<typeof devices>;
export type InsertDevicesInterface = InferModel<typeof devices, 'insert'>;
export type AllowedQueryStrings = z.infer<typeof allowedQueryStrings>;
