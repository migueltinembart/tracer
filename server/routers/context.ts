import { inferAsyncReturnType } from "@trpc/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { JWT, getToken } from "next-auth/jwt";
import { db } from "../db";

interface CreateInnerContextOptions
  extends Partial<{ req: NextRequest; res?: NextResponse }> {
  token: JWT | null;
}

export async function createContextInner(opts?: CreateInnerContextOptions) {
  return {
    token: opts?.token,
  };
}

interface CreateOuterContextOptions {
  req: NextRequest;
  res?: NextResponse;
}

export async function createContext(opts: CreateOuterContextOptions) {
  const token = await getToken({ req: opts.req });
  const innerContext = await createContextInner({
    req: opts.req,
    token: token,
  });
  return {
    req: opts.req,
    res: opts.res,
    ...innerContext,
  };
}

export type Context = Awaited<inferAsyncReturnType<typeof createContext>>;
