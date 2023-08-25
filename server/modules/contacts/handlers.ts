import { FastifyReply, FastifyRequest } from 'fastify';
import {
  insertOneContact,
  selectAll,
  SelectContactById,
  updateContact,
  updateContacts,
  deleteContact,
} from './services';
import { SelectContactsInterface, AllowedQueryStrings, InsertContactsInterface } from './schemas';

export async function getIndexHandler(
  request: FastifyRequest<{ Querystring: AllowedQueryStrings }>,
  reply: FastifyReply
) {
  const result = await selectAll(request.query);
  return result;
}

export async function getContactByIdHandler(
  request: FastifyRequest<{ Params: SelectContactsInterface }>,
  reply: FastifyReply
) {
  const result = await SelectContactById(request.params);

  if (!result) {
    reply.status(404).send();
  } else {
    reply.status(200).send(result);
  }
}

export async function postContactHandler(
  request: FastifyRequest<{ Body: InsertContactsInterface }>,
  reply: FastifyReply
) {
  const result = await insertOneContact(request.body);
  reply.status(201).send(result);
}

export async function putContactsHandler(
  request: FastifyRequest<{ Body: SelectContactsInterface[] }>,
  reply: FastifyReply
) {
  const result = await updateContacts(request.body);
  reply.status(200).send(result);
}

export async function putContactHandler(
  request: FastifyRequest<{ Body: SelectContactsInterface; Params: SelectContactsInterface }>,
  reply: FastifyReply
) {
  const combinedRequest: SelectContactsInterface = { ...request.body, id: request.params.id };
  const result = await updateContact(combinedRequest);
  reply.status(200).send(result);
}

export async function deleteContactHandler(
  request: FastifyRequest<{ Params: SelectContactsInterface }>,
  reply: FastifyReply
) {
  const result = await deleteContact(request.params);
  if (!result) {
    reply.status(400).send();
  }
  reply.status(204).send('Successfully deleted contact');
}
