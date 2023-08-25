import { FastifyReply, FastifyRequest } from 'fastify';
import {
  insertOneInterface,
  selectAll,
  SelectInterfaceById,
  updateInterface,
  updateInterfaces,
  deleteInterface,
} from './services';
import { SelectInterfacesInterface, AllowedQueryStrings, InsertInterfacesInterface } from './schemas';

export async function getIndexHandler(
  request: FastifyRequest<{ Querystring: AllowedQueryStrings }>,
  reply: FastifyReply
) {
  const result = await selectAll(request.query);
  return result;
}

export async function getInterfaceByIdHandler(
  request: FastifyRequest<{ Params: SelectInterfacesInterface }>,
  reply: FastifyReply
) {
  const result = await SelectInterfaceById(request.params);

  if (!result) {
    reply.status(404).send();
  } else {
    reply.status(200).send(result);
  }
}

export async function postInterfaceHandler(
  request: FastifyRequest<{ Body: InsertInterfacesInterface }>,
  reply: FastifyReply
) {
  const result = await insertOneInterface(request.body);
  reply.status(201).send(result);
}

export async function putInterfacesHandler(
  request: FastifyRequest<{ Body: SelectInterfacesInterface[] }>,
  reply: FastifyReply
) {
  const result = await updateInterfaces(request.body);
  reply.status(200).send(result);
}

export async function putInterfaceHandler(
  request: FastifyRequest<{ Body: SelectInterfacesInterface; Params: SelectInterfacesInterface }>,
  reply: FastifyReply
) {
  const combinedRequest: SelectInterfacesInterface = { ...request.body, id: request.params.id };
  const result = await updateInterface(combinedRequest);
  reply.status(200).send(result);
}

export async function deleteInterfaceHandler(
  request: FastifyRequest<{ Params: SelectInterfacesInterface }>,
  reply: FastifyReply
) {
  const result = await deleteInterface(request.params);
  if (!result) {
    reply.status(400).send();
  }
  reply.status(204).send('Successfully deleted interface');
}
