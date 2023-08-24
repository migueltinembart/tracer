import fastify from 'fastify';
import { logger } from './logger';
import { env } from '../config/env';
import healthRoutes from 'src/backend/modules/health/routes';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import sitesRoutes from 'src/backend/modules/sites/routes';
import siteGroupsRoutes from 'src/backend/modules/siteGroups/routes';
import tenantsRoutes from 'src/backend/modules/tenants/routes';
import tenantGroupsRoutes from 'src/backend/modules/tenantGroups/routes';
import contactsRoutes from 'src/backend/modules/contacts/routes';
import contactGroupsRoutes from 'src/backend/modules/contactGroups/routes';
import locationsRoutes from 'src/backend/modules/locations/routes';
import racksRoutes from 'src/backend/modules/racks/routes';
import deviceTemplatesRoutes from 'src/backend/modules/deviceTemplates/routes';
import devicesRoutes from 'src/backend/modules/devices/routes';
import qrCodesRoutes from 'src/backend/modules/qrCodes/routes';
import interfacesRoutes from 'src/backend/modules/interfaces/routes';

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
  await app.register(contactsRoutes, { prefix: 'api/contacts' });
  await app.register(contactGroupsRoutes, { prefix: 'api/contact-groups' });
  await app.register(locationsRoutes, { prefix: 'api/locations' });
  await app.register(racksRoutes, { prefix: 'api/racks' });
  await app.register(deviceTemplatesRoutes, { prefix: 'api/device-templates' });
  await app.register(devicesRoutes, { prefix: 'api/devices' });
  await app.register(qrCodesRoutes, { prefix: 'api/qr' });
  await app.register(interfacesRoutes, { prefix: 'api/interfaces' });

  await app.ready();
  app.swagger();

  return app;
}
