import { FastifyReply, FastifyRequest } from 'fastify';
import { deleteSite, insertOneSite, putSite, selectAll, getSiteById } from './services';
import { SitesInsertInterface, SitesInterface } from './schemas';

export async function getSiteByIdHandler(request: FastifyRequest<{ Params: SitesInterface }>, reply: FastifyReply) {
  const result = await getSiteById(request.params);
  return result;
}

export async function getIndexHandler(request: FastifyRequest, reply: FastifyReply) {
  const result = await selectAll();
  return result;
}

export async function postSiteHandler(request: FastifyRequest<{ Body: SitesInsertInterface }>, reply: FastifyReply) {
  const result = await insertOneSite(request.body);
  reply.code(201).send(result[0]);
}

export async function putSiteHandler(request: FastifyRequest<{ Body: SitesInterface }>, reply: FastifyReply) {
  const result = await putSite(request.body);
  return result;
}

export async function deleteSiteHandler(request: FastifyRequest<{ Body: SitesInterface }>, reply: FastifyReply) {
  const result = await deleteSite(request.body);
  return result;
}
