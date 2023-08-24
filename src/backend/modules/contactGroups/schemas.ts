import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { contactGroups } from 'src/backend/db/entities';
import { FastifySchema, RequestGenericInterface } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { z } from 'zod';
import { InferModel } from 'drizzle-orm';
import { createPaginationQueryStrings } from 'src/backend/modules/pagination/apiUtils';

// zod schemas here

const contactGroupResponseZodSchema = createSelectSchema(contactGroups);

const contactGroupCollectionResponseZodSchema = z.array(contactGroupResponseZodSchema);

export const allowedQueryStrings = createPaginationQueryStrings(contactGroupResponseZodSchema);

const insertContactGroupZodSchema = createInsertSchema(contactGroups).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});

const updateContactGroupZodSchema = createInsertSchema(contactGroups).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});
const updateContactGroupsZodSchema = z.array(
  createInsertSchema(contactGroups).omit({ createdAt: true, updatedAt: true })
);

const swaggerOpts: FastifySchema = {
  tags: ['Contact Groups'],
};

const getContactGroupsByIdZodSchema = z
  .object({
    id: z.coerce.number(),
  })
  .describe('Takes an id as a parameter');

export const getContactGroupsSchema: FastifySchema = {
  ...swaggerOpts,
  querystring: zodToJsonSchema(allowedQueryStrings),
  response: { 200: zodToJsonSchema(contactGroupCollectionResponseZodSchema) },
};

export const getByIdSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getContactGroupsByIdZodSchema),
  response: { 200: zodToJsonSchema(contactGroupResponseZodSchema) },
};

export const postContactGroupSchema: FastifySchema = {
  ...swaggerOpts,
  body: zodToJsonSchema(insertContactGroupZodSchema),
  response: { 201: zodToJsonSchema(contactGroupResponseZodSchema) },
};

export const putContactGroupsSchema: FastifySchema = {
  ...swaggerOpts,
  body: zodToJsonSchema(updateContactGroupsZodSchema),
  response: { 200: zodToJsonSchema(contactGroupCollectionResponseZodSchema) },
};

export const putContactGroupSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getContactGroupsByIdZodSchema),
  body: zodToJsonSchema(updateContactGroupZodSchema),
  response: { 200: zodToJsonSchema(contactGroupResponseZodSchema) },
};

export const deleteContactGroupSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getContactGroupsByIdZodSchema),
  response: {
    204: {
      description: 'Successfully deleted contactGroup',
      type: 'null',
    },
  },
};

export type SelectContactGroupsInterface = InferModel<typeof contactGroups>;
export type InsertContactGroupsInterface = InferModel<typeof contactGroups, 'insert'>;
export type AllowedQueryStrings = z.infer<typeof allowedQueryStrings>;
