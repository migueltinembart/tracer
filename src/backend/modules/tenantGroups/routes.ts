import { FastifyInstance } from 'fastify';
import {
  deleteTenantGroupHandler,
  getIndexHandler,
  getTenantGroupByIdHandler,
  postTenantGroupHandler,
  putTenantGroupHandler,
  putTenantGroupsHandler,
} from './handlers';
import {
  getByIdSchema,
  getTenantGroupSchema,
  postTenantGroupSchema,
  putTenantGroupsSchema,
  putTenantGroupSchema,
  deleteTenantGroupSchema,
} from './schemas';

export default async function tenantGroupsRoutes(fastify: FastifyInstance) {
  fastify.get('/', { schema: getTenantGroupSchema }, getIndexHandler);

  fastify.get('/:id', { schema: getByIdSchema }, getTenantGroupByIdHandler);

  fastify.post('/', { schema: postTenantGroupSchema }, postTenantGroupHandler);

  fastify.put('/', { schema: putTenantGroupsSchema }, putTenantGroupsHandler);

  fastify.put('/:id', { schema: putTenantGroupSchema }, putTenantGroupHandler);

  fastify.delete('/:id', { schema: deleteTenantGroupSchema }, deleteTenantGroupHandler);
}
