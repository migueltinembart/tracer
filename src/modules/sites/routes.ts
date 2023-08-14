import { FastifyInstance } from 'fastify';
import { deleteSiteHandler, getIndexHandler, getSiteByIdHandler, postSiteHandler, putSiteHandler } from './handlers';
import { zodToJsonSchema } from 'zod-to-json-schema';
import {
  createSiteZodSchema,
  deleteSiteZodSchema,
  getSiteByIdZodSchema,
  responseManyZodSchema,
  responseZodSchema,
  updateSiteZodSchema,
} from './schemas';

export default async function sitesRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/',
    {
      schema: {
        response: {
          200: zodToJsonSchema(responseManyZodSchema),
        },
      },
    },
    getIndexHandler
  );

  fastify.get(
    '/:id',
    {
      schema: {
        params: zodToJsonSchema(getSiteByIdZodSchema),
        response: {
          200: zodToJsonSchema(responseZodSchema),
        },
      },
    },
    getSiteByIdHandler
  );

  fastify.post(
    '/',
    {
      schema: {
        body: zodToJsonSchema(createSiteZodSchema),
        response: {
          201: zodToJsonSchema(responseZodSchema),
        },
      },
    },
    postSiteHandler
  );

  fastify.put(
    '/',
    {
      schema: {
        body: zodToJsonSchema(updateSiteZodSchema),
        response: {
          202: zodToJsonSchema(updateSiteZodSchema),
        },
      },
    },
    putSiteHandler
  );

  fastify.delete(
    '/',
    {
      schema: {
        body: zodToJsonSchema(deleteSiteZodSchema),
        response: {
          202: zodToJsonSchema(deleteSiteZodSchema),
        },
      },
    },
    deleteSiteHandler
  );
}
