import fastify from 'fastify';
import { logger } from './logger';
import { env } from '../config/env';
import sitesRoutes from 'modules/sites/sites.routes';

export async function buildServer() {
  const app = fastify({
    logger: logger,
  });

  logger.debug(env, 'using env');

  async function gracefulShutdown({ app: app }: { app: Awaited<ReturnType<typeof buildServer>> }) {
    await app.close();
  }

  app.register(sitesRoutes, {prefix: "api/sites"})

  const signals = ['SIGINT', 'SIGTERM'];

  for (const signal of signals) {
    process.on(signal, () => {
      gracefulShutdown({
        app,
      });
    });
  }

  return app;
}
