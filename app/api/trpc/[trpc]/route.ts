import { appRouter } from "@/server/appRouter";
import { createContext } from "@/server/routers/context";
import { NextApiRequest, NextApiResponse } from "next";
import { createNextApiHandler } from "@trpc/server/adapters/next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  createNextApiHandler({
    router: appRouter.auth,
    createContext: async () => createContext({ req, res }),
  });
};

export { handler as GET, handler as POST };
