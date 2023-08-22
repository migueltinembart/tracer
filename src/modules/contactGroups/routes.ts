import { FastifyInstance } from 'fastify';
import {
  deleteContactGroupHandler,
  getIndexHandler,
  getContactGroupByIdHandler,
  postContactGroupHandler,
  putContactGroupHandler,
  putContactGroupsHandler,
} from './handlers';
import {
  getByIdSchema,
  getContactGroupsSchema,
  postContactGroupSchema,
  putContactGroupsSchema,
  putContactGroupSchema,
  deleteContactGroupSchema,
} from './schemas';

export default async function contactGroupsRoutes(fastify: FastifyInstance) {
  fastify.get('/', { schema: getContactGroupsSchema }, getIndexHandler);

  fastify.get('/:id', { schema: getByIdSchema }, getContactGroupByIdHandler);

  fastify.post('/', { schema: postContactGroupSchema }, postContactGroupHandler);

  fastify.put('/', { schema: putContactGroupsSchema }, putContactGroupsHandler);

  fastify.put('/:id', { schema: putContactGroupSchema }, putContactGroupHandler);

  fastify.delete('/:id', { schema: deleteContactGroupSchema }, deleteContactGroupHandler);
}
