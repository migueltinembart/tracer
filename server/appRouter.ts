import { router } from "./trpc";
import { entities_router } from "./routers/entitiesRouter";
import { device_management_router } from "./routers/deviceManagementRouter";

export const appRouter = router({
  entities: entities_router,
  deviceManagement: device_management_router,
});

export type AppRouter = typeof appRouter;
