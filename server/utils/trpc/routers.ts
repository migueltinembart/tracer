import { router } from 'utils/trpc/trpc';
import { sitesRouter } from '../../modules/tRPC/siteRouter';
import { siteGroupsRouter } from '@server/modules/tRPC/siteGroupRouter';
import { tenantsRouter } from '@server/modules/tRPC/tenantRouter';
import { tenantGroupsRouter } from '@server/modules/tRPC/tenantGroupRouter';
import { contactsRouter } from '@server/modules/tRPC/contactRoter';
import { contactGroupsRouter } from '@server/modules/tRPC/contactGroupRouter';
import { racksRouter } from '@server/modules/tRPC/rackRouter';
import { interfacesRouter } from '@server/modules/tRPC/interfaceRouter';
import { locationsRouter } from '@server/modules/tRPC/locationRouter';

export const appRouter = router({
  sites: sitesRouter,
  siteGroups: siteGroupsRouter,
  tenants: tenantsRouter,
  tenantGroups: tenantGroupsRouter,
  contacts: contactsRouter,
  contactGroups: contactGroupsRouter,
  racks: racksRouter,
  interfaces: interfacesRouter,
  locations: locationsRouter,
});

export type AppRouter = typeof appRouter;
