import { router } from '@server/utils/trpc/trpc';
import { interfacesRouter } from '@server/modules/deviceManagement/interfaceRouter';
import { devicesRouter } from './deviceManagement/deviceRouter';

export const deviceManagementRouter = router({
  interfaces: interfacesRouter,
  devices: devicesRouter,
});
