import { FastifyInstance } from 'fastify';
import {
  deleteRackHandler,
  getIndexHandler,
  getRackByIdHandler,
  postRackHandler,
  putRackHandler,
  putRacksHandler,
} from './handlers';
import {
  getByIdSchema,
  getRacksSchema,
  postRackSchema,
  putRacksSchema,
  putRackSchema,
  deleteRackSchema,
} from './schemas';

export default async function racksRoutes(fastify: FastifyInstance) {
  fastify.get('/', { schema: getRacksSchema }, getIndexHandler);

  fastify.get('/:id', { schema: getByIdSchema }, getRackByIdHandler);

  fastify.post('/', { schema: postRackSchema }, postRackHandler);

  fastify.put('/', { schema: putRacksSchema }, putRacksHandler);

  fastify.put('/:id', { schema: putRackSchema }, putRackHandler);

  fastify.delete('/:id', { schema: deleteRackSchema }, deleteRackHandler);
}
