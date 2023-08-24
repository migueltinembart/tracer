import { FastifyReply, FastifyRequest } from 'fastify';
import { insertOneQrCode, selectAll, SelectQrCodeById, updateQrCode, updateQrCodes, deleteQrCode } from './services';
import { SelectQrCodesInterface, AllowedQueryStrings, InsertQrCodesInterface } from './schemas';

export async function getIndexHandler(
  request: FastifyRequest<{ Querystring: AllowedQueryStrings }>,
  reply: FastifyReply
) {
  const result = await selectAll(request.query);
  return result;
}

export async function getQrCodeByIdHandler(
  request: FastifyRequest<{ Params: SelectQrCodesInterface }>,
  reply: FastifyReply
) {
  const result = await SelectQrCodeById(request.params);

  if (!result) {
    reply.status(404).send();
  } else {
    reply.status(200).send(result);
  }
}

export async function postQrCodeHandler(
  request: FastifyRequest<{ Body: InsertQrCodesInterface }>,
  reply: FastifyReply
) {
  const result = await insertOneQrCode(request.body);
  reply.status(201).send(result);
}

export async function putQrCodesHandler(
  request: FastifyRequest<{ Body: SelectQrCodesInterface[] }>,
  reply: FastifyReply
) {
  const result = await updateQrCodes(request.body);
  reply.status(200).send(result);
}

export async function putQrCodeHandler(
  request: FastifyRequest<{ Body: SelectQrCodesInterface; Params: SelectQrCodesInterface }>,
  reply: FastifyReply
) {
  const combinedRequest: SelectQrCodesInterface = { ...request.body, id: request.params.id };
  const result = await updateQrCode(combinedRequest);
  reply.status(200).send(result);
}

export async function deleteQrCodeHandler(
  request: FastifyRequest<{ Params: SelectQrCodesInterface }>,
  reply: FastifyReply
) {
  const result = await deleteQrCode(request.params);
  if (!result) {
    reply.status(400).send();
  }
  reply.status(204).send('Successfully deleted qrCode');
}
