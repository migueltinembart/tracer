import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { qrCodes } from 'db/deviceManagement';
import { FastifySchema, RequestGenericInterface } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { z } from 'zod';
import { InferModel } from 'drizzle-orm';
import { createPaginationQueryStrings } from 'modules/pagination/apiUtils';

// zod schemas here

const qrCodeResponseZodSchema = createSelectSchema(qrCodes);

const qrCodeCollectionResponseZodSchema = z.array(qrCodeResponseZodSchema);

export const allowedQueryStrings = createPaginationQueryStrings(qrCodeResponseZodSchema);

const insertQrCodeZodSchema = createInsertSchema(qrCodes).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});
const updateQrCodeZodSchema = createInsertSchema(qrCodes).omit({ id: true, updatedAt: true, createdAt: true });
const updateQrCodesZodSchema = z.array(createInsertSchema(qrCodes).omit({ createdAt: true, updatedAt: true }));

const swaggerOpts: FastifySchema = {
  tags: ['QR Codes'],
};

const getQrCodesByIdZodSchema = z
  .object({
    id: z.coerce.number(),
  })
  .describe('Takes an id as a parameter');

export const getQrCodesSchema: FastifySchema = {
  ...swaggerOpts,
  querystring: zodToJsonSchema(allowedQueryStrings),
  response: { 200: zodToJsonSchema(qrCodeCollectionResponseZodSchema) },
};

export const getByIdSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getQrCodesByIdZodSchema),
  response: { 200: zodToJsonSchema(qrCodeResponseZodSchema) },
};

export const postQrCodeSchema: FastifySchema = {
  ...swaggerOpts,
  body: zodToJsonSchema(insertQrCodeZodSchema),
  response: { 201: zodToJsonSchema(qrCodeResponseZodSchema) },
};

export const putQrCodesSchema: FastifySchema = {
  ...swaggerOpts,
  body: zodToJsonSchema(updateQrCodesZodSchema),
  response: { 200: zodToJsonSchema(qrCodeCollectionResponseZodSchema) },
};

export const putQrCodeSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getQrCodesByIdZodSchema),
  body: zodToJsonSchema(updateQrCodeZodSchema),
  response: { 200: zodToJsonSchema(qrCodeResponseZodSchema) },
};

export const deleteQrCodeSchema: FastifySchema = {
  ...swaggerOpts,
  params: zodToJsonSchema(getQrCodesByIdZodSchema),
  response: {
    204: {
      description: 'Successfully deleted qrCode',
      type: 'null',
    },
  },
};

export type SelectQrCodesInterface = InferModel<typeof qrCodes>;
export type InsertQrCodesInterface = InferModel<typeof qrCodes, 'insert'>;
export type AllowedQueryStrings = z.infer<typeof allowedQueryStrings>;
