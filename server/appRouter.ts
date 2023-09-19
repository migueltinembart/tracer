import { router, publicProcedure } from "./trpc";

const appRouter = router({
  sites: sitesRouter,
});
