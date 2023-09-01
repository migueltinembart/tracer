import type { AppRouter } from "@server/utils/trpc/routers";
import { createTRPCReact } from "@trpc/react-query";


export const trpc = createTRPCReact<AppRouter>();