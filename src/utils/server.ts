import fastify from 'fastify';
import { logger } from './logger';
import { env } from '../config/env';
import healthRoutes from 'modules/health/health.routes';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

export async function buildServer() {
  const app = fastify({
    logger: logger,
  });

  logger.debug(env, 'using env');

  async function gracefulShutdown({ app: app }: { app: Awaited<ReturnType<typeof buildServer>> }) {
    await app.close();
  }

  const signals = ['SIGINT', 'SIGTERM'];

  app.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'tracer API',
        description: 'test',
        version: '3.0.0',
      },
      host: 'localhost',
      schemes: ['http'],
      externalDocs: {
        url: 'https://rebsamen.net',
        description: 'Test it out somewhere else',
      },
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  });

  app.register(fastifySwaggerUi, { prefix: 'docs' });

  for (const signal of signals) {
    process.on(signal, () => {
      gracefulShutdown({
        app,
      });
    });
  }

  app.register(healthRoutes, { prefix: 'api/health' });
  //app.register(sitesRoutes, { prefix: 'api/sites' });

  await app.ready();
  app.swagger();

  return app;
}
