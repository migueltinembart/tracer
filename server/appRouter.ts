import { router } from "./trpc";
import { entitiesRouter } from "./routers/entitiesRouter";
import { deviceManagementRouter } from "./routers/deviceManagementRouter";

export const appRouter = router({
  entities: entitiesRouter,
  deviceManagement: deviceManagementRouter,
});

export type AppRouter = typeof appRouter;
