import { fastifyStatic } from '@fastify/static';
import { FastifyInstance } from 'fastify';
import path from 'path';

export async function catchAllRoutes(fastify: FastifyInstance) {
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, '..', '..', '..', 'build', 'dist'),
    wildcard: true,
    index: 'index.html',
  });

  fastify.setNotFoundHandler((request, reply) => {
    reply.sendFile("index.html")
  })
}
