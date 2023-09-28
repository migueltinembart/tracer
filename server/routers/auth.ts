import { privateProcedure, router } from "../trpc";

export const authRouter = router({
  getSession: privateProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
});
