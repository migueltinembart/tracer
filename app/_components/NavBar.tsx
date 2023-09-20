import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { AlignLeft } from "lucide-react";
import { NavMenuSmall } from "./NavMenus";
import clsx from "clsx";
import { sharedPadding } from "./Shared";

const headerClass = clsx(["h-14 flex justify-between items-center shadow-md", sharedPadding]);

export default function NavBar({ children }: { children?: ReactNode }) {
  return (
    <header className={headerClass}>
      <div className="flex items-center">
        <NavMenuSmall></NavMenuSmall>
        <Link href={"/"}>Tracer</Link>
      </div>
      <div className="max-sm:hidden">{children}</div>
      <div>Avatar</div>
    </header>
  );
}
