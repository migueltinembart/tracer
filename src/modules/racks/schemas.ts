import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { racks } from 'db/entities';
import { FastifySchema } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { z } from 'zod';
import { InferModel } from 'drizzle-orm';
import { createPaginationQueryStrings } from 'modules/pagination/apiUtils';

// zod schemas here

const rackResponseZodSchema = createSelectSchema(racks);

const rackCollectionResponseZodSchema = z.array(rackResponseZodSchema);

export const allowedQueryStrings = createPaginationQueryStrings(rackResponseZodSchema);

const insertRackZodSchema = createInsertSchema(racks).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});
const updateRackZodSchema = createInsertSchema(racks).omit({ id: true, updatedAt: true, createdAt: true });
const updateRacksZodSchema = z.array(createInsertSchema(racks).omit({ createdAt: true, updatedAt: true }));

const swaggerOpts: FastifySchema = {
  tags: ['racks'],
};

const getRacksByIdZodSchema = z
  .object({
    id: z.coerce.number(),
  })
  .describe('Takes an id as a parameter');

export const getRacksSchema: FastifySchema = {
  ...swaggerOpts,
  querystring: zodToJsonSchema(allowedQueryStrings),
  response: { 200: zodToJsonSchema(rackCollectionResponseZodSchema) },
};

export const getByIdSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getRacksByIdZodSchema),
  response: { 200: zodToJsonSchema(rackResponseZodSchema) },
};

export const postRackSchema: FastifySchema = {
  ...swaggerOpts,
  body: zodToJsonSchema(insertRackZodSchema),
  response: { 201: zodToJsonSchema(rackResponseZodSchema) },
};

export const putRacksSchema: FastifySchema = {
  ...swaggerOpts,
  body: zodToJsonSchema(updateRacksZodSchema),
  response: { 200: zodToJsonSchema(rackCollectionResponseZodSchema) },
};

export const putRackSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getRacksByIdZodSchema),
  body: zodToJsonSchema(updateRackZodSchema),
  response: { 200: zodToJsonSchema(rackResponseZodSchema) },
};

export const deleteRackSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getRacksByIdZodSchema),
  response: {
    204: {
      description: 'Successfully deleted rack',
      type: 'null',
    },
  },
};

export type SelectRacksInterface = InferModel<typeof racks>;
export type InsertRacksInterface = InferModel<typeof racks, 'insert'>;
export type AllowedQueryStrings = z.infer<typeof allowedQueryStrings>;
