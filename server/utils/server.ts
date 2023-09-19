import fastify from 'fastify';
import { logger } from './logger';
import { env } from '../config/env';
import { catchAllRoutes } from '@server/modules/catchall/routes';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { appRouter } from '@server/utils/trpc/routers';
import { createContext } from './trpc/context';

export async function buildServer() {
  const app = fastify({
    logger: logger,
  });

  logger.debug(env, 'using env');

  await app.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: { router: appRouter, createContext },
  });

  // Register routes here

  await app.register(catchAllRoutes);
  await app.ready();

  return app;
}
