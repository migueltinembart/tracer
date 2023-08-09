import fastify from 'fastify';
import { logger } from './logger';
import { env } from '../config/env';

export async function buildServer() {
  const app = fastify({
    logger: logger,
  });

  logger.debug(env, 'using env');

  async function gracefulShutdown({ app: app }: { app: Awaited<ReturnType<typeof buildServer>> }) {
    await app.close();
  }

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
