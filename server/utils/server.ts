import fastify from 'fastify';
import { logger } from './logger';
import { env } from '../config/env';
import healthRoutes from 'modules/REST/health/routes';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import sitesRoutes from 'modules/REST/sites/routes';
import siteGroupsRoutes from 'modules/REST/siteGroups/routes';
import tenantsRoutes from 'modules/REST/tenants/routes';
import tenantGroupsRoutes from 'modules/REST/tenantGroups/routes';
import contactsRoutes from 'modules/REST/contacts/routes';
import contactGroupsRoutes from 'modules/REST/contactGroups/routes';
import locationsRoutes from 'modules/REST/locations/routes';
import racksRoutes from 'modules/REST/racks/routes';
import deviceTemplatesRoutes from 'modules/REST/deviceTemplates/routes';
import devicesRoutes from 'modules/REST/devices/routes';
import qrCodesRoutes from 'modules/REST/qrCodes/routes';
import interfacesRoutes from 'modules/REST/interfaces/routes';
import { catchAllRoutes } from 'modules/REST/catchall/routes';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { appRouter } from 'utils/trpc/routers';
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
  await app.register(contactsRoutes, { prefix: 'api/contacts' });
  await app.register(contactGroupsRoutes, { prefix: 'api/contact-groups' });
  await app.register(locationsRoutes, { prefix: 'api/locations' });
  await app.register(racksRoutes, { prefix: 'api/racks' });
  await app.register(deviceTemplatesRoutes, { prefix: 'api/device-templates' });
  await app.register(devicesRoutes, { prefix: 'api/devices' });
  await app.register(qrCodesRoutes, { prefix: 'api/qr' });
  await app.register(interfacesRoutes, { prefix: 'api/interfaces' });
  await app.register(catchAllRoutes);
  await app.ready();
  app.swagger();

  return app;
}
