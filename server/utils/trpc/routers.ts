import { entitiesRouter } from '@server/modules/entitiesRouter';
import { router } from 'utils/trpc/trpc';

export const appRouter = router({
  entities: entitiesRouter,
});

export type AppRouter = typeof appRouter;
