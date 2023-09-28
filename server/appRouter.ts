import { router, privateProcedure } from "./trpc";
import { sitesRouter } from "./routers/entities/siteRouter";
import { tenantsRouter } from "./routers/entities/tenantRouter";
import { z } from "zod";
import { authRouter } from "./routers/auth";

export const appRouter = router({
  sites: sitesRouter,
  tenants: tenantsRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
