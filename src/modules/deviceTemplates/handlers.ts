import { FastifyReply, FastifyRequest } from 'fastify';
import {
  insertOneDeviceTemplate,
  selectAll,
  SelectDeviceTemplateById,
  updateDeviceTemplate,
  updateDeviceTemplates,
  deleteDeviceTemplate,
} from './services';
import { SelectDeviceTemplatesInterface, AllowedQueryStrings, InsertDeviceTemplatesInterface } from './schemas';

export async function getIndexHandler(
  request: FastifyRequest<{ Querystring: AllowedQueryStrings }>,
  reply: FastifyReply
) {
  const result = await selectAll(request.query);
  return result;
}

export async function getDeviceTemplateByIdHandler(
  request: FastifyRequest<{ Params: SelectDeviceTemplatesInterface }>,
  reply: FastifyReply
) {
  const result = await SelectDeviceTemplateById(request.params);

  if (!result) {
    reply.status(404).send();
  } else {
    reply.status(200).send(result);
  }
}

export async function postDeviceTemplateHandler(
  request: FastifyRequest<{ Body: InsertDeviceTemplatesInterface }>,
  reply: FastifyReply
) {
  const result = await insertOneDeviceTemplate(request.body);
  reply.status(201).send(result);
}

export async function putDeviceTemplatesHandler(
  request: FastifyRequest<{ Body: SelectDeviceTemplatesInterface[] }>,
  reply: FastifyReply
) {
  const result = await updateDeviceTemplates(request.body);
  reply.status(200).send(result);
}

export async function putDeviceTemplateHandler(
  request: FastifyRequest<{ Body: SelectDeviceTemplatesInterface; Params: SelectDeviceTemplatesInterface }>,
  reply: FastifyReply
) {
  const combinedRequest: SelectDeviceTemplatesInterface = { ...request.body, id: request.params.id };
  const result = await updateDeviceTemplate(combinedRequest);
  reply.status(200).send(result);
}

export async function deleteDeviceTemplateHandler(
  request: FastifyRequest<{ Params: SelectDeviceTemplatesInterface }>,
  reply: FastifyReply
) {
  const result = await deleteDeviceTemplate(request.params);
  if (!result) {
    reply.status(400).send();
  }
  reply.status(204).send('Successfully deleted deviceTemplate');
}
