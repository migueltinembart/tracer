import { NextResponse } from "next/server";
import { privateProcedure, router } from "../trpc";

export const authRouter = router({
  getSession: privateProcedure.query(async ({ ctx }) => {
    return ctx.token?.name;
  }),
});
