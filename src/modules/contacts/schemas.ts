import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { contacts } from 'db/entities';
import { FastifySchema, RequestGenericInterface } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { z } from 'zod';
import { InferModel } from 'drizzle-orm';
import { createPaginationQueryStrings } from 'modules/pagination/apiUtils';

// zod schemas here

const contactResponseZodSchema = createSelectSchema(contacts);

const contactCollectionResponseZodSchema = z.array(contactResponseZodSchema);

export const allowedQueryStrings = createPaginationQueryStrings(contactResponseZodSchema);

const insertContactZodSchema = createInsertSchema(contacts).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});
const updateContactZodSchema = createInsertSchema(contacts).omit({ updatedAt: true, createdAt: true });
const updateContactsZodSchema = z.array(updateContactZodSchema);

const swaggerOpts: FastifySchema = {
  tags: ['contacts'],
};

const getContactsByIdZodSchema = z
  .object({
    id: z.coerce.number(),
  })
  .describe('Takes an id as a parameter');

export const getContactsSchema: FastifySchema = {
  ...swaggerOpts,
  querystring: zodToJsonSchema(allowedQueryStrings),
  response: { 200: zodToJsonSchema(contactCollectionResponseZodSchema) },
};

export const getByIdSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getContactsByIdZodSchema),
  response: { 200: zodToJsonSchema(contactResponseZodSchema) },
};

export const postContactSchema: FastifySchema = {
  ...swaggerOpts,
  body: zodToJsonSchema(insertContactZodSchema),
  response: { 201: zodToJsonSchema(contactResponseZodSchema) },
};

export const putContactsSchema: FastifySchema = {
  ...swaggerOpts,
  body: zodToJsonSchema(updateContactsZodSchema),
  response: { 200: zodToJsonSchema(contactCollectionResponseZodSchema) },
};

export const putContactSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getContactsByIdZodSchema),
  body: zodToJsonSchema(updateContactZodSchema),
  response: { 200: zodToJsonSchema(contactResponseZodSchema) },
};

export const deleteContactSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getContactsByIdZodSchema),
  response: {
    204: {
      description: 'Successfully deleted contact',
      type: 'null',
    },
  },
};

export type SelectContactsInterface = InferModel<typeof contacts>;
export type InsertContactsInterface = InferModel<typeof contacts, 'insert'>;
export type AllowedQueryStrings = z.infer<typeof allowedQueryStrings>;
