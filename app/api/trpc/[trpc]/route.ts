import { appRouter } from "@/server/appRouter";
import { createContext } from "@/server/routers/context";
import { NextApiRequest, NextApiResponse } from "next";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = async (req: Request, res: Response) => {
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter.auth,
    createContext: async () => createContext({ req, res }),
  });
};

export { handler as GET, handler as POST };
