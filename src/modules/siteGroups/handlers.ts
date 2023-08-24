import { FastifyReply, FastifyRequest } from 'fastify';
import {
  insertOneSiteGroup,
  selectAll,
  SelectSiteGroupById,
  updateSiteGroup,
  updateSiteGroups,
  deleteSiteGroup,
} from './services';
import { SelectSiteGroupsInterface, AllowedQueryStrings, InsertSiteGroupsInterface } from './schemas';

export async function getIndexHandler(
  request: FastifyRequest<{ Querystring: AllowedQueryStrings }>,
  reply: FastifyReply
) {
  const result = await selectAll(request.query);
  return result;
}

export async function getSiteGroupByIdHandler(
  request: FastifyRequest<{ Params: SelectSiteGroupsInterface }>,
  reply: FastifyReply
) {
  const result = await SelectSiteGroupById(request.params);

  if (!result) {
    reply.status(404).send();
  } else {
    reply.status(200).send(result);
  }
}

export async function postSiteGroupHandler(
  request: FastifyRequest<{ Body: SelectSiteGroupsInterface }>,
  reply: FastifyReply
) {
  const result = await insertOneSiteGroup(request.body);
  reply.status(201).send(result);
}

export async function putSiteGroupsHandler(
  request: FastifyRequest<{ Body: SelectSiteGroupsInterface[] }>,
  reply: FastifyReply
) {
  const result = await updateSiteGroups(request.body);
  reply.status(200).send(result);
}

export async function putSiteGroupHandler(
  request: FastifyRequest<{ Body: SelectSiteGroupsInterface; Params: SelectSiteGroupsInterface }>,
  reply: FastifyReply
) {
  const combinedRequest: SelectSiteGroupsInterface = { ...request.body, id: request.params.id };
  const result = await updateSiteGroup(combinedRequest);
  reply.status(200).send(result);
}

export async function deleteSiteGroupHandler(
  request: FastifyRequest<{ Params: SelectSiteGroupsInterface }>,
  reply: FastifyReply
) {
  const result = await deleteSiteGroup(request.params);
  if (!result) {
    reply.status(400).send();
  } else {
    reply.status(204).send('Successfully deleted siteGroup');
  }
}
