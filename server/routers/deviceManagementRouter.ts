import { router } from "@/server/trpc";
import { interfacesRouter } from "@/server/routers/deviceManagement/interfaceRouter";
import { devicesRouter } from "@/server/routers/deviceManagement/deviceRouter";

export const deviceManagementRouter = router({
  interfaces: interfacesRouter,
  devices: devicesRouter,
});
