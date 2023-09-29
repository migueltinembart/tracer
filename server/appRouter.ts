import { router, privateProcedure } from "./trpc";
import { sitesRouter } from "./routers/entities/siteRouter";
import { tenantsRouter } from "./routers/entities/tenantRouter";
import { z } from "zod";
import { authRouter } from "./routers/auth";

export const appRouter = router({
  sites: sitesRouter,
  tenants: tenantsRouter,
  authorized: router({
    getInfo: privateProcedure.query((opts) => {
      console.log(opts.ctx.token);
      return opts.ctx.token;
    }),
  }),
});

export type AppRouter = typeof appRouter;
