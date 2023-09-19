import { router } from '@server/utils/trpc/trpc';
import { sitesRouter } from '@server/modules/entities/siteRouter';
import { siteGroupsRouter } from '@server/modules/entities/siteGroupRouter';
import { tenantsRouter } from '@server/modules/entities/tenantRouter';
import { tenantGroupsRouter } from '@server/modules/entities/tenantGroupRouter';
import { contactsRouter } from '@server/modules/entities/contactRoter';
import { contactGroupsRouter } from '@server/modules/entities/contactGroupRouter';
import { racksRouter } from '@server/modules/entities/rackRouter';

import { locationsRouter } from '@server/modules/entities/locationRouter';

export const entitiesRouter = router({
  sites: sitesRouter,
  siteGroups: siteGroupsRouter,
  tenants: tenantsRouter,
  tenantGroups: tenantGroupsRouter,
  contacts: contactsRouter,
  contactGroups: contactGroupsRouter,
  racks: racksRouter,
  locations: locationsRouter,
});
