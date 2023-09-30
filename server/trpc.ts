import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "./routers/context";

// You can use any variable name you like.
// We use t to keep things simple.
export const t = initTRPC.context<Context>().create();
export const publicProcedure = t.procedure;

const isAuthorized = t.middleware(async (opts) => {
  const { ctx } = opts;
  if (!ctx.token) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to access this resource",
    });
  }
  return opts.next({
    ctx: {
      token: ctx.token,
      req: ctx.req,
      res: ctx.res,
    },
  });
});
export const router = t.router;
export const middleware = t.middleware;

export const privateProcedure = t.procedure.use(isAuthorized);
