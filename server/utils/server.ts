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
import contactsRoutes from 'modules/contacts/routes';
import contactGroupsRoutes from 'modules/contactGroups/routes';
import locationsRoutes from 'modules/locations/routes';
import racksRoutes from 'modules/racks/routes';
import deviceTemplatesRoutes from 'modules/deviceTemplates/routes';
import devicesRoutes from 'modules/devices/routes';
import qrCodesRoutes from 'modules/qrCodes/routes';
import interfacesRoutes from 'modules/interfaces/routes';
import { catchAllRoutes } from 'modules/catchall/routes';

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
  await app.register(catchAllRoutes);
  await app.ready();
  app.swagger();
  
  return app;
}
