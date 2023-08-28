import { FastifyReply, FastifyRequest } from 'fastify';
import { insertOneRack, selectAll, SelectRackById, updateRack, updateRacks, deleteRack } from './services';
import { SelectRacksInterface, AllowedQueryStrings, InsertRacksInterface } from './schemas';

export async function getIndexHandler(
  request: FastifyRequest<{ Querystring: AllowedQueryStrings }>,
  reply: FastifyReply
) {
  const result = await selectAll(request.query);
  return result;
}

export async function getRackByIdHandler(
  request: FastifyRequest<{ Params: SelectRacksInterface }>,
  reply: FastifyReply
) {
  const result = await SelectRackById(request.params);

  if (!result) {
    reply.status(404).send();
  } else {
    reply.status(200).send(result);
  }
}

export async function postRackHandler(request: FastifyRequest<{ Body: InsertRacksInterface }>, reply: FastifyReply) {
  const result = await insertOneRack(request.body);
  reply.status(201).send(result);
}

export async function putRacksHandler(request: FastifyRequest<{ Body: SelectRacksInterface[] }>, reply: FastifyReply) {
  const result = await updateRacks(request.body);
  reply.status(200).send(result);
}

export async function putRackHandler(
  request: FastifyRequest<{ Body: SelectRacksInterface; Params: SelectRacksInterface }>,
  reply: FastifyReply
) {
  const combinedRequest: SelectRacksInterface = { ...request.body, id: request.params.id };
  const result = await updateRack(combinedRequest);
  reply.status(200).send(result);
}

export async function deleteRackHandler(
  request: FastifyRequest<{ Params: SelectRacksInterface }>,
  reply: FastifyReply
) {
  const result = await deleteRack(request.params);
  if (!result) {
    reply.status(400).send();
  }
  reply.status(204).send('Successfully deleted rack');
}
