import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import {
  authOptions as NextAuthOptions,
  authOptions,
} from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { inferAsyncReturnType } from "@trpc/server";
import { type Session } from "next-auth";

interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
  session: Session | null;
}

export async function createContextInner(opts?: CreateInnerContextOptions) {
  return {
    session: opts?.session,
  };
}

export async function createContext(opts: CreateNextContextOptions) {
  const session = await getServerSession(NextAuthOptions);

  const contextInner = await createContextInner({ session });
  return {
    ...contextInner,
    req: opts.req,
    res: opts.res,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
