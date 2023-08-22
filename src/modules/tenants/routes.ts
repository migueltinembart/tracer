import { FastifyInstance } from 'fastify';
import {
  deleteTenantHandler,
  getIndexHandler,
  getTenantByIdHandler,
  postTenantHandler,
  putTenantHandler,
  putTenantsHandler,
} from './handlers';
import {
  getByIdSchema,
  getTenantsSchema,
  postTenantSchema,
  putTenantsSchema,
  putTenantSchema,
  deleteTenantSchema,
} from './schemas';

export default async function tenantsRoutes(fastify: FastifyInstance) {
  fastify.get('/', { schema: getTenantsSchema }, getIndexHandler);

  fastify.get('/:id', { schema: getByIdSchema }, getTenantByIdHandler);

  fastify.post('/', { schema: postTenantSchema }, postTenantHandler);

  fastify.put('/', { schema: putTenantsSchema }, putTenantsHandler);

  fastify.put('/:id', { schema: putTenantSchema }, putTenantHandler);

  fastify.delete('/:id', { schema: deleteTenantSchema }, deleteTenantHandler);
}
