import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { locations } from 'src/backend/db/entities';
import { FastifySchema, RequestGenericInterface } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { z } from 'zod';
import { InferModel } from 'drizzle-orm';
import { createPaginationQueryStrings } from 'src/backend/modules/pagination/apiUtils';

// zod schemas here

const locationResponseZodSchema = createSelectSchema(locations);

const locationCollectionResponseZodSchema = z.array(locationResponseZodSchema);

export const allowedQueryStrings = createPaginationQueryStrings(locationResponseZodSchema);

const insertLocationZodSchema = createInsertSchema(locations).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});
const updateLocationZodSchema = createInsertSchema(locations).omit({ id: true, updatedAt: true, createdAt: true });
const updateLocationsZodSchema = z.array(createInsertSchema(locations).omit({ createdAt: true, updatedAt: true }));

const swaggerOpts: FastifySchema = {
  tags: ['Locations'],
};

const getLocationsByIdZodSchema = z
  .object({
    id: z.coerce.number(),
  })
  .describe('Takes an id as a parameter');

export const getLocationsSchema: FastifySchema = {
  ...swaggerOpts,
  querystring: zodToJsonSchema(allowedQueryStrings),
  response: { 200: zodToJsonSchema(locationCollectionResponseZodSchema) },
};

export const getByIdSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getLocationsByIdZodSchema),
  response: { 200: zodToJsonSchema(locationResponseZodSchema) },
};

export const postLocationSchema: FastifySchema = {
  ...swaggerOpts,
  body: zodToJsonSchema(insertLocationZodSchema),
  response: { 201: zodToJsonSchema(locationResponseZodSchema) },
};

export const putLocationsSchema: FastifySchema = {
  ...swaggerOpts,
  body: zodToJsonSchema(updateLocationsZodSchema),
  response: { 200: zodToJsonSchema(locationCollectionResponseZodSchema) },
};

export const putLocationSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getLocationsByIdZodSchema),
  body: zodToJsonSchema(updateLocationZodSchema),
  response: { 200: zodToJsonSchema(locationResponseZodSchema) },
};

export const deleteLocationSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getLocationsByIdZodSchema),
  response: {
    204: {
      description: 'Successfully deleted location',
      type: 'null',
    },
  },
};

export type SelectLocationsInterface = InferModel<typeof locations>;
export type InsertLocationsInterface = InferModel<typeof locations, 'insert'>;
export type AllowedQueryStrings = z.infer<typeof allowedQueryStrings>;
