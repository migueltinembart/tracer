import { appRouter } from "@/server/appRouter";
import { createContext } from "@/server/routers/context";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest, res: NextResponse) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async () => await createContext({ req, res }),
  });
}

export { handler as GET, handler as POST };
