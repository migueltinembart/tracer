import Link from "next/link";
import { ReactNode } from "react";
import { MenubarItem, NavMenuLarge, NavMenuSmall } from "./NavMenus";
import clsx from "clsx";
import { sharedPadding } from "./Shared";
import { ProfileMenu } from "./Profile";
import { getServerSession } from "next-auth";

import { NavMenuSearchBar } from "./Search";
import { Component1Icon, CubeIcon, RocketIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";

const iconSize = 15;

const list: MenubarItem[] = [
  {
    title: "Entities",
    image: <CubeIcon height={iconSize} width={iconSize} />,
    items: [
      {
        name: "Tenants",
        description: "description",
        listItems: [
          {
            label: "Tenants",
            href: "entities/tenants",
          },
          {
            label: "Tenant Groups",
            href: "entities/tenant-groups",
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
          { label: "Locations", href: "entities/locations" },
          {
            label: "Racks",
            href: "entities/racks",
          },
          {
            label: "Rack Roles",
            href: "entities/rack-roles",
          },
        ],
      },
      {
        name: "Contacts",
        description: "Description",
        listItems: [
          {
            label: "Contacts",
            href: "entities/contacts",
          },
          {
            label: "Contact Groups",
            href: "entities/contact-groups",
          },
        ],
      },
    ],
  },
  {
    title: "Device Management",
    image: <Component1Icon height={iconSize} width={iconSize} />,
    items: [
      {
        name: "Devices",
        description: "Description",
        listItems: [
          { label: "Devices", href: "device-management/devices" },
          { label: "Device Types", href: "device-management/device-types" },
          { label: "Device Roles", href: "device-management/device-roles" },
          { label: "Manufacturers", href: "device-management/manufacturers" },
          { label: "Plattforms", href: "device-management/plattforms" },
          { label: "QR-Codes", href: "device-management/qr-codes" },
          { label: "Interfaces", href: "device-management/interfaces" },
          { label: "Services", href: "device-management/services" },
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
    items: [],
  },
];

const headerClass = clsx([
  "h-12 items-center grid grid-cols-3 grid-rows-1 border-b shadow-sm",
  sharedPadding,
]);

export default async function NavBar({ children }: { children?: ReactNode }) {
  const session = await getServerSession();

  return (
    <header className={headerClass}>
      <div className="flex items-center col-start-1 gap-5">
        <NavMenuSmall></NavMenuSmall>

        <Link href={"/"} className="flex items-center text-xl">
          Tracer
        </Link>
        <NavMenuSearchBar className="flex items-center justify-between w-[250px] max-md:hidden" />
      </div>

      <NavMenuLarge
        className="justify-center col-start-2 shadow-none border-hidden"
        menuItems={list}
      ></NavMenuLarge>
      <ProfileMenu
        name={session?.user.name}
        email={session?.user.email}
        image={session?.user.image}
      ></ProfileMenu>
    </header>
  );
}
