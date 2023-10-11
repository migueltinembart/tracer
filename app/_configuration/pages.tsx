import { type MenubarItem } from "../_components/nav-menu";
import { CubeIcon, Component1Icon, RocketIcon } from "@radix-ui/react-icons";

const iconSize = 15;
export const list: MenubarItem[] = [
  {
    title: "Entities",
    image: <CubeIcon />,
    cards: [
      {
        name: "Tenants",
        description: "description",
        listItems: [
          {
            label: "Tenants",
            href: "/entities/tenants",
          },
          {
            label: "Tenant Groups",
            href: "/entities/tenant-groups",
          },
        ],
      },
      {
        name: "Sites",
        description: "Description",
        listItems: [
          {
            label: "Sites",
            href: "/entities/sites",
          },
          {
            label: "Site Groups",
            href: "/entities/site-groups",
          },
        ],
      },
      {
        name: "Placement",
        description: "Description",
        listItems: [
          { label: "Locations", href: "/entities/locations" },
          {
            label: "Racks",
            href: "/entities/racks",
          },
          {
            label: "Rack Roles",
            href: "/entities/rack-roles",
          },
        ],
      },
      {
        name: "Contacts",
        description: "Description",
        listItems: [
          {
            label: "Contacts",
            href: "/entities/contacts",
          },
          {
            label: "Contact Groups",
            href: "/entities/contact-groups",
          },
        ],
      },
    ],
  },
  {
    title: "Device Management",
    image: <Component1Icon strokeWidth={"5px"} />,
    cards: [
      {
        name: "Configurator",
        description:
          "Enter the configuration mode, where all devices represent node objects",
        listItems: [
          {
            label: "Flow",
            href: "/device-management/flow",
          },
        ],
      },
      {
        name: "Devices",
        description: "Description",
        listItems: [
          { label: "Devices", href: "/device-management/devices" },
          { label: "Device Types", href: "/device-management/device-types" },
          { label: "Device Roles", href: "/device-management/device-roles" },
          { label: "Manufacturers", href: "/device-management/manufacturers" },
          { label: "Plattforms", href: "/device-management/plattforms" },
          { label: "QR-Codes", href: "/device-management/qr-codes" },
          { label: "Interfaces", href: "/device-management/interfaces" },
          { label: "Services", href: "/device-management/services" },
        ],
      },
      {
        name: "IPAM",
        description: "Description",
        listItems: [
          { label: "IP Adresses", href: "ipam/ip-adresses" },
          { label: "IP Adress Ranges", href: "ipam/ip-address-ranges" },
          { label: "Subnets", href: "ipam/subnets" },
          { label: "Vlans", href: "ipam/vlans" },
          { label: "Network Roles", href: "ipam/network-roles" },
        ],
      },
      {
        name: "Wireless",
        description: "Description",
        listItems: [
          { label: "Wireless LANs", href: "wireless/wireless-lans" },
          { label: "WLAN Groups", href: "wireless/wireless-lan-groups" },
        ],
      },
    ],
  },
  {
    title: "Project Management",
    image: <RocketIcon height={iconSize} width={iconSize} />,
    cards: [
      {
        name: "Flows",
        description: "Description",
        listItems: [],
      },
    ],
  },
];
