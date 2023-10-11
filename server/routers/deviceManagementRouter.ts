import { router } from "@/server/trpc";
import { interfaces_router } from "@/server/routers/deviceManagement/interfaceRouter";
import { devices_router } from "@/server/routers/deviceManagement/deviceRouter";

export const device_management_router = router({
  interfaces: interfaces_router,
  devices: devices_router,
});
