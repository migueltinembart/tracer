import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "./routers/context";

// You can use any variable name you like.
// We use t to keep things simple.
export const t = initTRPC.context<Context>().create();

const isAuthorized = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});
export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthorized);
