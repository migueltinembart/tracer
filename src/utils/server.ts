import fastify from 'fastify';
import { logger } from './logger';
import { env } from '../config/env';
import healthRoutes from 'modules/health/routes';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import sitesRoutes from 'modules/sites/routes';
import siteGroupsRoutes from 'modules/siteGroups/routes';
import tenantsRoutes from 'modules/tenants/routes';
import tenantGroupsRoutes from 'modules/tenantGroups/routes';

export async function buildServer() {
  const app = fastify({
    logger: logger,
  });

  logger.debug(env, 'using env');

  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Tracer',
        version: '0.0.0',
      },
    },
  });

  await app.register(fastifySwaggerUi, { routePrefix: 'docs' });

  // Register routes here
  await app.register(healthRoutes, { prefix: 'api/status' });
  await app.register(sitesRoutes, { prefix: 'api/sites' });
  await app.register(siteGroupsRoutes, { prefix: '/api/site-groups' });
  await app.register(tenantsRoutes, { prefix: 'api/tenants' });
  await app.register(tenantGroupsRoutes, { prefix: 'api/tenant-groups' });

  await app.ready();
  app.swagger();

  return app;
}
