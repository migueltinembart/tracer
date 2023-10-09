import Link from "next/link";
import { ReactNode } from "react";
import { MenubarItem, NavMenuLarge, NavMenuSmall } from "./NavMenus";
import clsx from "clsx";
import { sharedPadding } from "./Shared";
import { ProfileMenu } from "./Profile";
import { getServerSession } from "next-auth";
import { list } from "@/app/_configuration/hierarchy";
import { NavMenuSearchBar } from "./Search";

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
