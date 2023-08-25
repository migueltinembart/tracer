import { FastifyReply, FastifyRequest } from 'fastify';
import {
  insertOneLocation,
  selectAll,
  SelectLocationById,
  updateLocation,
  updateLocations,
  deleteLocation,
} from './services';
import { SelectLocationsInterface, AllowedQueryStrings, InsertLocationsInterface } from './schemas';

export async function getIndexHandler(
  request: FastifyRequest<{ Querystring: AllowedQueryStrings }>,
  reply: FastifyReply
) {
  const result = await selectAll(request.query);
  return result;
}

export async function getLocationByIdHandler(
  request: FastifyRequest<{ Params: SelectLocationsInterface }>,
  reply: FastifyReply
) {
  const result = await SelectLocationById(request.params);

  if (!result) {
    reply.status(404).send();
  } else {
    reply.status(200).send(result);
  }
}

export async function postLocationHandler(
  request: FastifyRequest<{ Body: InsertLocationsInterface }>,
  reply: FastifyReply
) {
  const result = await insertOneLocation(request.body);
  reply.status(201).send(result);
}

export async function putLocationsHandler(
  request: FastifyRequest<{ Body: SelectLocationsInterface[] }>,
  reply: FastifyReply
) {
  const result = await updateLocations(request.body);
  reply.status(200).send(result);
}

export async function putLocationHandler(
  request: FastifyRequest<{ Body: SelectLocationsInterface; Params: SelectLocationsInterface }>,
  reply: FastifyReply
) {
  const combinedRequest: SelectLocationsInterface = { ...request.body, id: request.params.id };
  const result = await updateLocation(combinedRequest);
  reply.status(200).send(result);
}

export async function deleteLocationHandler(
  request: FastifyRequest<{ Params: SelectLocationsInterface }>,
  reply: FastifyReply
) {
  const result = await deleteLocation(request.params);
  if (!result) {
    reply.status(400).send();
  }
  reply.status(204).send('Successfully deleted location');
}
