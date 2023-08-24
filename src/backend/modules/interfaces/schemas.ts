import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { interfaces } from 'src/backend/db/deviceManagement';
import { FastifySchema, RequestGenericInterface } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { z } from 'zod';
import { InferModel } from 'drizzle-orm';
import { createPaginationQueryStrings } from 'src/backend/modules/pagination/apiUtils';

// zod schemas here

const interfaceResponseZodSchema = createSelectSchema(interfaces);

const interfaceCollectionResponseZodSchema = z.array(interfaceResponseZodSchema);

export const allowedQueryStrings = createPaginationQueryStrings(interfaceResponseZodSchema);

const insertInterfaceZodSchema = createInsertSchema(interfaces).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});
const updateInterfaceZodSchema = createInsertSchema(interfaces).omit({ id: true, updatedAt: true, createdAt: true });
const updateInterfacesZodSchema = z.array(createInsertSchema(interfaces).omit({ createdAt: true, updatedAt: true }));

const swaggerOpts: FastifySchema = {
  tags: ['Interfaces'],
};

const getInterfacesByIdZodSchema = z
  .object({
    id: z.coerce.number(),
  })
  .describe('Takes an id as a parameter');

export const getInterfacesSchema: FastifySchema = {
  ...swaggerOpts,
  querystring: zodToJsonSchema(allowedQueryStrings),
  response: { 200: zodToJsonSchema(interfaceCollectionResponseZodSchema) },
};

export const getByIdSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getInterfacesByIdZodSchema),
  response: { 200: zodToJsonSchema(interfaceResponseZodSchema) },
};

export const postInterfaceSchema: FastifySchema = {
  ...swaggerOpts,
  body: zodToJsonSchema(insertInterfaceZodSchema),
  response: { 201: zodToJsonSchema(interfaceResponseZodSchema) },
};

export const putInterfacesSchema: FastifySchema = {
  ...swaggerOpts,
  body: zodToJsonSchema(updateInterfacesZodSchema),
  response: { 200: zodToJsonSchema(interfaceCollectionResponseZodSchema) },
};

export const putInterfaceSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getInterfacesByIdZodSchema),
  body: zodToJsonSchema(updateInterfaceZodSchema),
  response: { 200: zodToJsonSchema(interfaceResponseZodSchema) },
};

export const deleteInterfaceSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getInterfacesByIdZodSchema),
  response: {
    204: {
      description: 'Successfully deleted interface',
      type: 'null',
    },
  },
};

export type SelectInterfacesInterface = InferModel<typeof interfaces>;
export type InsertInterfacesInterface = InferModel<typeof interfaces, 'insert'>;
export type AllowedQueryStrings = z.infer<typeof allowedQueryStrings>;
