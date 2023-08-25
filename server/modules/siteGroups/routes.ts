import { FastifyInstance } from 'fastify';
import {
  deleteSiteGroupHandler,
  getIndexHandler,
  getSiteGroupByIdHandler,
  postSiteGroupHandler,
  putSiteGroupHandler,
  putSiteGroupsHandler,
} from './handlers';
import {
  getByIdSchema,
  getSiteGroupSchema,
  postSiteGroupSchema,
  putSiteGroupsSchema,
  putSiteGroupSchema,
  deleteSiteGroupSchema,
} from './schemas';

export default async function siteGroupsRoutes(fastify: FastifyInstance) {
  fastify.get('/', { schema: getSiteGroupSchema }, getIndexHandler);

  fastify.get('/:id', { schema: getByIdSchema }, getSiteGroupByIdHandler);

  fastify.post('/', { schema: postSiteGroupSchema }, postSiteGroupHandler);

  fastify.put('/', { schema: putSiteGroupsSchema }, putSiteGroupsHandler);

  fastify.put('/:id', { schema: putSiteGroupSchema }, putSiteGroupHandler);

  fastify.delete('/:id', { schema: deleteSiteGroupSchema }, deleteSiteGroupHandler);
}
