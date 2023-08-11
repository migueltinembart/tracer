import { FastifyInstance } from 'fastify';

// Route at /api/sites
export default async function healthRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/',
    {
      schema: {
        description: 'healthcheck',
        tags: ['health'],
        summary: 'test',
      },
    },
    (req, res) => {
      return {};
    }
  );
}
