import { FastifyReply, FastifyRequest } from 'fastify';
import {
  insertOneTenantGroup,
  selectAll,
  SelectTenantGroupById,
  updateTenantGroup,
  updateTenantGroups,
  deleteTenantGroup,
} from './services';
import { SelectTenantGroupsInterface, AllowedQueryStrings, InsertTenantGroupsInterface } from './schemas';

export async function getIndexHandler(
  request: FastifyRequest<{ Querystring: AllowedQueryStrings }>,
  reply: FastifyReply
) {
  const result = await selectAll(request.query);
  return result;
}

export async function getTenantGroupByIdHandler(
  request: FastifyRequest<{ Params: SelectTenantGroupsInterface }>,
  reply: FastifyReply
) {
  const result = await SelectTenantGroupById(request.params);

  if (!result) {
    reply.status(404).send();
  } else {
    reply.status(200).send(result);
  }
}

export async function postTenantGroupHandler(
  request: FastifyRequest<{ Body: SelectTenantGroupsInterface }>,
  reply: FastifyReply
) {
  const result = await insertOneTenantGroup(request.body);
  reply.status(201).send(result);
}

export async function putTenantGroupsHandler(
  request: FastifyRequest<{ Body: SelectTenantGroupsInterface[] }>,
  reply: FastifyReply
) {
  const result = await updateTenantGroups(request.body);
  reply.status(200).send(result);
}

export async function putTenantGroupHandler(
  request: FastifyRequest<{ Body: SelectTenantGroupsInterface; Params: SelectTenantGroupsInterface }>,
  reply: FastifyReply
) {
  const combinedRequest: SelectTenantGroupsInterface = { ...request.body, id: request.params.id };
  const result = await updateTenantGroup(combinedRequest);
  reply.status(200).send(result);
}

export async function deleteTenantGroupHandler(
  request: FastifyRequest<{ Params: SelectTenantGroupsInterface }>,
  reply: FastifyReply
) {
  const result = await deleteTenantGroup(request.params);
  if (!result) {
    reply.status(400).send();
  } else {
    reply.status(204).send('Successfully deleted tenantGroup');
  }
}
