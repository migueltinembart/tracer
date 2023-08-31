import { initTRPC } from '@trpc/server';


export const t = initTRPC.create();

export const appRouter = t.mergeRouters();

// export type definition of API
export type AppRouter = typeof appRouter;
