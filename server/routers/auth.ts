import { NextResponse } from "next/server";
import { privateProcedure, router } from "../trpc";
import { z } from "zod";
import { db } from "../db";
import { accounts } from "../db/auth";
import { eq } from "drizzle-orm";

const schema = z.object({});

export const authRouter = router({
  getSession: privateProcedure.query(async (opts) => {
    console.log(opts.ctx.token.accessToken);
    return opts.ctx.token.accessToken;
  }),
});
