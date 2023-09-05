import { router } from 'utils/trpc/trpc';
import { sitesRouter } from '../../modules/TRPC/siteRouters';
import { siteGroupsRouter } from '@server/modules/TRPC/siteGroupRouters';
import { tenantsRouter } from '@server/modules/TRPC/tenantRouter';

export const appRouter = router({
  sites: sitesRouter,
  siteGroups: siteGroupsRouter,
  tenants: tenantsRouter,
});

export type AppRouter = typeof appRouter;
