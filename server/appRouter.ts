import { router, privateProcedure } from "./trpc";
import { sitesRouter } from "./routers/entities/siteRouter";
import { tenantsRouter } from "./routers/entities/tenantRouter";
import { authRouter } from "./routers/auth";


export const appRouter = router({
  sites: sitesRouter,
  tenants: tenantsRouter,
  authorized: authRouter,
});

export type AppRouter = typeof appRouter;
