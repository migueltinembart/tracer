import { FastifyInstance } from 'fastify';
import {
  deleteLocationHandler,
  getIndexHandler,
  getLocationByIdHandler,
  postLocationHandler,
  putLocationHandler,
  putLocationsHandler,
} from './handlers';
import {
  getByIdSchema,
  getLocationsSchema,
  postLocationSchema,
  putLocationsSchema,
  putLocationSchema,
  deleteLocationSchema,
} from './schemas';

export default async function locationsRoutes(fastify: FastifyInstance) {
  fastify.get('/', { schema: getLocationsSchema }, getIndexHandler);

  fastify.get('/:id', { schema: getByIdSchema }, getLocationByIdHandler);

  fastify.post('/', { schema: postLocationSchema }, postLocationHandler);

  fastify.put('/', { schema: putLocationsSchema }, putLocationsHandler);

  fastify.put('/:id', { schema: putLocationSchema }, putLocationHandler);

  fastify.delete('/:id', { schema: deleteLocationSchema }, deleteLocationHandler);
}
