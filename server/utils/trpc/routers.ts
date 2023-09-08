import { router } from 'utils/trpc/trpc';
import { sitesRouter } from '../../modules/TRPC/siteRouter';
import { siteGroupsRouter } from '@server/modules/TRPC/siteGroupRouter';
import { tenantsRouter } from '@server/modules/TRPC/tenantRouter';
import { tenantGroupsRouter } from '@server/modules/TRPC/tenantGroupRouter';
import { contactsRouter } from '@server/modules/TRPC/contactRoter';
import { contactGroupsRouter } from '@server/modules/TRPC/contactGroupRouter';

export const appRouter = router({
  sites: sitesRouter,
  siteGroups: siteGroupsRouter,
  tenants: tenantsRouter,
  tenantGroups: tenantGroupsRouter,
  contacts: contactsRouter,
  contactGroups: contactGroupsRouter,
});

export type AppRouter = typeof appRouter;
