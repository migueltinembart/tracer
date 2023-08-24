import { FastifyReply, FastifyRequest } from 'fastify';
import {
  insertOneContactGroup,
  selectAll,
  SelectContactGroupById,
  updateContactGroup,
  updateContactGroups,
  deleteContactGroup,
} from './services';
import { SelectContactGroupsInterface, AllowedQueryStrings, InsertContactGroupsInterface } from './schemas';

export async function getIndexHandler(
  request: FastifyRequest<{ Querystring: AllowedQueryStrings }>,
  reply: FastifyReply
) {
  const result = await selectAll(request.query);
  return result;
}

export async function getContactGroupByIdHandler(
  request: FastifyRequest<{ Params: SelectContactGroupsInterface }>,
  reply: FastifyReply
) {
  const result = await SelectContactGroupById(request.params);

  if (!result) {
    reply.status(404).send();
  } else {
    reply.status(200).send(result);
  }
}

export async function postContactGroupHandler(
  request: FastifyRequest<{ Body: InsertContactGroupsInterface }>,
  reply: FastifyReply
) {
  const result = await insertOneContactGroup(request.body);
  reply.status(201).send(result);
}

export async function putContactGroupsHandler(
  request: FastifyRequest<{ Body: SelectContactGroupsInterface[] }>,
  reply: FastifyReply
) {
  const result = await updateContactGroups(request.body);
  reply.status(200).send(result);
}

export async function putContactGroupHandler(
  request: FastifyRequest<{ Body: SelectContactGroupsInterface; Params: SelectContactGroupsInterface }>,
  reply: FastifyReply
) {
  const combinedRequest: SelectContactGroupsInterface = { ...request.body, id: request.params.id };
  const result = await updateContactGroup(combinedRequest);
  reply.status(200).send(result);
}

export async function deleteContactGroupHandler(
  request: FastifyRequest<{ Params: SelectContactGroupsInterface }>,
  reply: FastifyReply
) {
  const result = await deleteContactGroup(request.params);
  if (!result) {
    reply.status(400).send();
  }
  reply.status(204).send('Successfully deleted contactGroup');
}
