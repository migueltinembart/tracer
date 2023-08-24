import { FastifyInstance } from 'fastify';
import {
  deleteDeviceHandler,
  getIndexHandler,
  getDeviceByIdHandler,
  postDeviceHandler,
  putDeviceHandler,
  putDevicesHandler,
} from './handlers';
import {
  getByIdSchema,
  getDevicesSchema,
  postDeviceSchema,
  putDevicesSchema,
  putDeviceSchema,
  deleteDeviceSchema,
} from './schemas';

export default async function devicesRoutes(fastify: FastifyInstance) {
  fastify.get('/', { schema: getDevicesSchema }, getIndexHandler);

  fastify.get('/:id', { schema: getByIdSchema }, getDeviceByIdHandler);

  fastify.post('/', { schema: postDeviceSchema }, postDeviceHandler);

  fastify.put('/', { schema: putDevicesSchema }, putDevicesHandler);

  fastify.put('/:id', { schema: putDeviceSchema }, putDeviceHandler);

  fastify.delete('/:id', { schema: deleteDeviceSchema }, deleteDeviceHandler);
}
