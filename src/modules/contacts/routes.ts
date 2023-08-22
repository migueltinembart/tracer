import { FastifyInstance } from 'fastify';
import {
  deleteContactHandler,
  getIndexHandler,
  getContactByIdHandler,
  postContactHandler,
  putContactHandler,
  putContactsHandler,
} from './handlers';
import {
  getByIdSchema,
  getContactsSchema,
  postContactSchema,
  putContactsSchema,
  putContactSchema,
  deleteContactSchema,
} from './schemas';

export default async function contactsRoutes(fastify: FastifyInstance) {
  fastify.get('/', { schema: getContactsSchema }, getIndexHandler);

  fastify.get('/:id', { schema: getByIdSchema }, getContactByIdHandler);

  fastify.post('/', { schema: postContactSchema }, postContactHandler);

  fastify.put('/', { schema: putContactsSchema }, putContactsHandler);

  fastify.put('/:id', { schema: putContactSchema }, putContactHandler);

  fastify.delete('/:id', { schema: deleteContactSchema }, deleteContactHandler);
}
