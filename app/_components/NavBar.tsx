import Link from "next/link";
import { ReactNode } from "react";
import { NavMenuSmall } from "./NavMenus";
import clsx from "clsx";
import { sharedPadding } from "./Shared";
import { AvatarIcon } from "./Avatar";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

const headerClass = clsx([
  "h-14 flex justify-between items-center shadow-md",
  sharedPadding,
]);

export default async function NavBar({ children }: { children?: ReactNode }) {
  const session = await getServerSession();

  return (
    <header className={headerClass}>
      <div className="flex items-center">
        <NavMenuSmall></NavMenuSmall>
        <Link href={"/"}>Tracer</Link>
      </div>
      <div className="max-sm:hidden">{children}</div>
      <AvatarIcon imageSrc={session?.user.image}></AvatarIcon>
    </header>
  );
}
