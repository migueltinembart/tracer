import { router } from "./trpc";
import { sitesRouter } from "./routers/entities/siteRouter";
import { tenantsRouter } from "./routers/entities/tenantRouter";
import { z } from "zod";

export const appRouter = router({
  sites: sitesRouter,
  tenants: tenantsRouter,
});

export type AppRouter = typeof appRouter;
