import { router } from 'utils/trpc/trpc';
import { sitesRouter } from '../../modules/TRPC/sites/routers';
import { siteGroupsRouter } from '@server/modules/TRPC/siteGroups/routers';

export const appRouter = router({
  sites: sitesRouter,
  siteGroups: siteGroupsRouter,
});

export type AppRouter = typeof appRouter;
