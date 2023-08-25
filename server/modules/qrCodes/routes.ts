import { FastifyInstance } from 'fastify';
import {
  deleteQrCodeHandler,
  getIndexHandler,
  getQrCodeByIdHandler,
  postQrCodeHandler,
  putQrCodeHandler,
  putQrCodesHandler,
} from './handlers';
import {
  getByIdSchema,
  getQrCodesSchema,
  postQrCodeSchema,
  putQrCodesSchema,
  putQrCodeSchema,
  deleteQrCodeSchema,
} from './schemas';

export default async function qrCodesRoutes(fastify: FastifyInstance) {
  fastify.get('/', { schema: getQrCodesSchema }, getIndexHandler);

  fastify.get('/:id', { schema: getByIdSchema }, getQrCodeByIdHandler);

  fastify.post('/', { schema: postQrCodeSchema }, postQrCodeHandler);

  fastify.put('/', { schema: putQrCodesSchema }, putQrCodesHandler);

  fastify.put('/:id', { schema: putQrCodeSchema }, putQrCodeHandler);

  fastify.delete('/:id', { schema: deleteQrCodeSchema }, deleteQrCodeHandler);
}
