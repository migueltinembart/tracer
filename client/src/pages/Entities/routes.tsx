import { RouteObject } from "react-router-dom";
import { Sites } from "./Sites/sites";
import { SiteGroups } from "./SiteGroups/siteGroups";
import { Tenants } from "./Tenants/tenants";
import { Locations } from "./Locations/locations";

export const entityRoutes: RouteObject = {
  path: "entities",
  children: [
    {
      path: "sites",
      element: <Sites />,
    },
    {
      path: "site-groups",
      element: <SiteGroups />,
    },
    {
      path: "tenants",
      element: <Tenants />,
    },
    {
      path: "tenant-groups",
    },
    {
      path: "locations",
      element: <Locations />,
    },
    {
      path: "interfaces",
    },
    {
      path: "devices",
    },
    {
      path: "contacts",
    },
    {
      path: "contact-groups",
    },
    {
      path: "racks",
    },
  ],
};
