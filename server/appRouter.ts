import { router, privateProcedure } from "./trpc";
import { sitesRouter } from "./routers/entities/siteRouter";
import { tenantsRouter } from "./routers/entities/tenantRouter";
import { z } from "zod";

const schema = z.object({
  businessPhones: z.array(z.string()),
  displayName: z.string(),
  givenName: z.string(),
  jobTitle: z.string(),
  mail: z.string(),
});

export const appRouter = router({
  sites: sitesRouter,
  tenants: tenantsRouter,
  test: privateProcedure.query(async ({ ctx }) => {
    const result = await fetch("https://graph.microsoft.com/v1.0/me", {
      headers: { Authorization: `Bearer ${ctx.token.access_token}` },
    });

    const data = await result.json();
    const parsed = schema.parse(data);
    return parsed;
  }),
});

export type AppRouter = typeof appRouter;
