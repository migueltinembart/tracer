import { router } from "@/server/trpc";
import { sitesRouter } from "@/server/routers/entities/siteRouter";
import { siteGroupsRouter } from "@/server/routers/entities/siteGroupRouter";
import { tenantsRouter } from "@/server/routers/entities/tenantRouter";
import { tenantGroupsRouter } from "@/server/routers/entities/tenantGroupRouter";
import { contactsRouter } from "@/server/routers/entities/contactRoter";
import { contactGroupsRouter } from "@/server/routers/entities/contactGroupRouter";
import { racksRouter } from "@/server/routers/entities/rackRouter";

import { locationsRouter } from "@/server/routers/entities/locationRouter";

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
