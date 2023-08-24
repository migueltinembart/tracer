import { FastifyReply, FastifyRequest } from 'fastify';
import { insertOneDevice, selectAll, SelectDeviceById, updateDevice, updateDevices, deleteDevice } from './services';
import { SelectDevicesInterface, AllowedQueryStrings, InsertDevicesInterface } from './schemas';

export async function getIndexHandler(
  request: FastifyRequest<{ Querystring: AllowedQueryStrings }>,
  reply: FastifyReply
) {
  const result = await selectAll(request.query);
  return result;
}

export async function getDeviceByIdHandler(
  request: FastifyRequest<{ Params: SelectDevicesInterface }>,
  reply: FastifyReply
) {
  const result = await SelectDeviceById(request.params);

  if (!result) {
    reply.status(404).send();
  } else {
    reply.status(200).send(result);
  }
}

export async function postDeviceHandler(
  request: FastifyRequest<{ Body: InsertDevicesInterface }>,
  reply: FastifyReply
) {
  const result = await insertOneDevice(request.body);
  reply.status(201).send(result);
}

export async function putDevicesHandler(
  request: FastifyRequest<{ Body: SelectDevicesInterface[] }>,
  reply: FastifyReply
) {
  const result = await updateDevices(request.body);
  reply.status(200).send(result);
}

export async function putDeviceHandler(
  request: FastifyRequest<{ Body: SelectDevicesInterface; Params: SelectDevicesInterface }>,
  reply: FastifyReply
) {
  const combinedRequest: SelectDevicesInterface = { ...request.body, id: request.params.id };
  const result = await updateDevice(combinedRequest);
  reply.status(200).send(result);
}

export async function deleteDeviceHandler(
  request: FastifyRequest<{ Params: SelectDevicesInterface }>,
  reply: FastifyReply
) {
  const result = await deleteDevice(request.params);
  if (!result) {
    reply.status(400).send();
  }
  reply.status(204).send('Successfully deleted device');
}
