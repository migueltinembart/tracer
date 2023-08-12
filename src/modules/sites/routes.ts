import { FastifyInstance } from 'fastify';
import { deleteSiteHandler, getIndexHandler, getSiteByIdHandler, postSiteHandler, putSiteHandler } from './handlers';
import {
  createSiteJsonSchema,
  deleteSiteJsonSchema,
  getSiteByIdJsonSchema,
  getSiteByNameJsonSchema,
  updateSiteJsonSchema,
} from './schemas';

export default async function sitesRoutes(fastify: FastifyInstance) {
  fastify.get('/', getIndexHandler);

  fastify.get('/:id', { schema: getSiteByIdJsonSchema }, getSiteByIdHandler);

  fastify.post('/', { schema: createSiteJsonSchema }, postSiteHandler);

  fastify.put('/', { schema: updateSiteJsonSchema }, putSiteHandler);

  fastify.delete('/', { schema: deleteSiteJsonSchema }, deleteSiteHandler);
}
