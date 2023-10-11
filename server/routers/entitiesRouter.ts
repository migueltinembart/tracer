import { router } from "@/server/trpc";
import { sites_router } from "@/server/routers/entities/siteRouter";
import { site_groups_router } from "@/server/routers/entities/siteGroupRouter";
import { tenants_router } from "@/server/routers/entities/tenantRouter";
import { tenant_groups_router } from "@/server/routers/entities/tenantGroupRouter";
import { contacts_router } from "@/server/routers/entities/contactRoter";
import { contact_groups_router } from "@/server/routers/entities/contactGroupRouter";
import { racks_router } from "@/server/routers/entities/rackRouter";

import { locations_router } from "@/server/routers/entities/locationRouter";

export const entities_router = router({
  sites: sites_router,
  site_groups: site_groups_router,
  tenants: tenants_router,
  tenant_groups: tenant_groups_router,
  contacts: contacts_router,
  contact_groups: contact_groups_router,
  racks: racks_router,
  locations: locations_router,
});
