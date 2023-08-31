import { mergeRouters, router } from 'utils/trpc/trpc';
import { sitesRouter } from '../../modules/TRPC/sites/routers';

export const appRouter = mergeRouters(sitesRouter);

export type AppRouter = typeof appRouter;
