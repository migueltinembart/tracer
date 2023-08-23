import { FastifyInstance } from 'fastify';
import {
  deleteDeviceTemplateHandler,
  getIndexHandler,
  getDeviceTemplateByIdHandler,
  postDeviceTemplateHandler,
  putDeviceTemplateHandler,
  putDeviceTemplatesHandler,
} from './handlers';
import {
  getByIdSchema,
  getDeviceTemplatesSchema,
  postDeviceTemplateSchema,
  putDeviceTemplatesSchema,
  putDeviceTemplateSchema,
  deleteDeviceTemplateSchema,
} from './schemas';

export default async function deviceTemplatesRoutes(fastify: FastifyInstance) {
  fastify.get('/', { schema: getDeviceTemplatesSchema }, getIndexHandler);

  fastify.get('/:id', { schema: getByIdSchema }, getDeviceTemplateByIdHandler);

  fastify.post('/', { schema: postDeviceTemplateSchema }, postDeviceTemplateHandler);

  fastify.put('/', { schema: putDeviceTemplatesSchema }, putDeviceTemplatesHandler);

  fastify.put('/:id', { schema: putDeviceTemplateSchema }, putDeviceTemplateHandler);

  fastify.delete('/:id', { schema: deleteDeviceTemplateSchema }, deleteDeviceTemplateHandler);
}
