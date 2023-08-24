import { FastifyInstance } from 'fastify';
import { deleteSiteHandler, getIndexHandler, getSiteByIdHandler, postSiteHandler, putSiteHandler, putSitesHandler } from './handlers';
import { getByIdSchema, getSitesSchema, postSiteSchema, putSitesSchema, putSiteSchema, deleteSiteSchema } from './schemas';

export default async function sitesRoutes(fastify: FastifyInstance) {
  fastify.get('/', { schema: getSitesSchema }, getIndexHandler);

  fastify.get('/:id', { schema: getByIdSchema }, getSiteByIdHandler);

  fastify.post('/', { schema: postSiteSchema }, postSiteHandler);

  fastify.put('/', { schema: putSitesSchema }, putSitesHandler);

  fastify.put('/:id', { schema: putSiteSchema }, putSiteHandler);

  fastify.delete('/:id', {schema: deleteSiteSchema}, deleteSiteHandler);
}
