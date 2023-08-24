import { FastifyReply, FastifyRequest } from 'fastify';
import { insertOneTenant, selectAll, SelectTenantById, updateTenant, updateTenants, deleteTenant } from './services';
import { SelectTenantsInterface, AllowedQueryStrings, InsertTenantsInterface } from './schemas';

export async function getIndexHandler(
  request: FastifyRequest<{ Querystring: AllowedQueryStrings }>,
  reply: FastifyReply
) {
  const result = await selectAll(request.query);
  return result;
}

export async function getTenantByIdHandler(
  request: FastifyRequest<{ Params: SelectTenantsInterface }>,
  reply: FastifyReply
) {
  const result = await SelectTenantById(request.params);

  if (!result) {
    reply.status(404).send();
  } else {
    reply.status(200).send(result);
  }
}

export async function postTenantHandler(
  request: FastifyRequest<{ Body: InsertTenantsInterface }>,
  reply: FastifyReply
) {
  const result = await insertOneTenant(request.body);
  reply.status(201).send(result);
}

export async function putTenantsHandler(
  request: FastifyRequest<{ Body: SelectTenantsInterface[] }>,
  reply: FastifyReply
) {
  const result = await updateTenants(request.body);
  reply.status(200).send(result);
}

export async function putTenantHandler(
  request: FastifyRequest<{ Body: SelectTenantsInterface; Params: SelectTenantsInterface }>,
  reply: FastifyReply
) {
  const combinedRequest: SelectTenantsInterface = { ...request.body, id: request.params.id };
  const result = await updateTenant(combinedRequest);
  reply.status(200).send(result);
}

export async function deleteTenantHandler(
  request: FastifyRequest<{ Params: SelectTenantsInterface }>,
  reply: FastifyReply
) {
  const result = await deleteTenant(request.params);
  if (!result) {
    reply.status(400).send();
  }
  reply.status(204).send('Successfully deleted tenant');
}
