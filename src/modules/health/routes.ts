import { FastifyInstance } from 'fastify';

// Route at /api/sites
export default async function healthRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/',
    {
      schema: {
        description: 'returns status information about the server',
        tags: ['Status'],
      },
    },
    (req, res) => {
      return {
        server: fastify.server,
        version: fastify.version
      }
    }
  );
}
