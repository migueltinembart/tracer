import { FastifyInstance } from 'fastify';
import {
  deleteInterfaceHandler,
  getIndexHandler,
  getInterfaceByIdHandler,
  postInterfaceHandler,
  putInterfaceHandler,
  putInterfacesHandler,
} from './handlers';
import {
  getByIdSchema,
  getInterfacesSchema,
  postInterfaceSchema,
  putInterfacesSchema,
  putInterfaceSchema,
  deleteInterfaceSchema,
} from './schemas';

export default async function interfacesRoutes(fastify: FastifyInstance) {
  fastify.get('/', { schema: getInterfacesSchema }, getIndexHandler);

  fastify.get('/:id', { schema: getByIdSchema }, getInterfaceByIdHandler);

  fastify.post('/', { schema: postInterfaceSchema }, postInterfaceHandler);

  fastify.put('/', { schema: putInterfacesSchema }, putInterfacesHandler);

  fastify.put('/:id', { schema: putInterfaceSchema }, putInterfaceHandler);

  fastify.delete('/:id', { schema: deleteInterfaceSchema }, deleteInterfaceHandler);
}
