import { FastifyReply, FastifyRequest } from 'fastify';
import { insertOneSite, selectAll, SelectSiteById, updateSite, updateSites, deleteSite } from './services';
import { SelectSitesInterface, AllowedQueryStrings, InsertSitesInterface } from './schemas';

export async function getIndexHandler(
  request: FastifyRequest<{ Querystring: AllowedQueryStrings }>,
  reply: FastifyReply
) {
  const result = await selectAll(request.query);
  return result;
}

export async function getSiteByIdHandler(
  request: FastifyRequest<{ Params: SelectSitesInterface }>,
  reply: FastifyReply
) {
  const result = await SelectSiteById(request.params);

  if (!result) {
    reply.status(404).send();
  } else {
    reply.status(200).send(result);
  }
}

export async function postSiteHandler(request: FastifyRequest<{ Body: InsertSitesInterface }>, reply: FastifyReply) {
  const result = await insertOneSite(request.body);
  reply.status(201).send(result);
}

export async function putSitesHandler(request: FastifyRequest<{ Body: SelectSitesInterface[] }>, reply: FastifyReply) {
  const result = await updateSites(request.body);
  reply.status(200).send(result);
}

export async function putSiteHandler(
  request: FastifyRequest<{ Body: SelectSitesInterface; Params: SelectSitesInterface }>,
  reply: FastifyReply
) {
  const combinedRequest: SelectSitesInterface = { ...request.body, id: request.params.id };
  const result = await updateSite(combinedRequest);
  reply.status(200).send(result);
}

export async function deleteSiteHandler(
  request: FastifyRequest<{ Params: SelectSitesInterface }>,
  reply: FastifyReply
) {
  const result = await deleteSite(request.params);
  if (!result) {
    reply.status(400).send();
  }
  reply.status(204).send('Successfully deleted site');
}
