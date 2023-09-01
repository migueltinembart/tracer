import { mergeRouters, router } from 'utils/trpc/trpc';
import { sitesRouter } from '../../modules/TRPC/sites/routers';

export const appRouter = router({
  sites: sitesRouter,
});

export type AppRouter = typeof appRouter;
