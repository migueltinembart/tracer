import Link from "next/link";
import { ReactNode } from "react";
import { NavMenuLarge } from "./nav-menu";
import clsx from "clsx";
import { sharedPadding } from "./shared";
import { ProfileMenu } from "./profile";
import { getServerSession } from "next-auth";
import { ModeToggle } from "./mode-toggle";

export default async function NavBar({ children }: { children?: ReactNode }) {
  const session = await getServerSession();

  return (
    <nav
      className={clsx([
        "py-2",
        "border",
        "border-t-8",
        "h-14",
        "border-t-emerald-400",
        "flex",
        "justify-between",
        "items-center",
        sharedPadding,
      ])}
    >
      <h1 className="tracking-tighter text-xl font-semibold text-gray-600">
        Tracer
      </h1>
      <NavMenuLarge></NavMenuLarge>

      <div className="flex items-center justify-between">
        <ModeToggle></ModeToggle>
        <ProfileMenu
          name={session?.user.name}
          email={session?.user.email}
          image={session?.user.image}
        ></ProfileMenu>
      </div>
    </nav>
  );
}
