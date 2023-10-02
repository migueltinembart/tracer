"use client";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignLeft, Building2 } from "lucide-react";
import clsx from "clsx";

const NavMenuLink = clsx([""]);

export function NavMenuLarge() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex gap-2 items-center">
            <Building2 size={20} strokeWidth={"1.5px"}></Building2>
            <div>Entities</div>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-2">
            <NavigationMenuLink className="w-40">
              <div className="bg-gray-100 p-1 flex flex-col rounded-sm w-40">
                <div className="font-bold flex-1">Sites</div>
                <div className="text-xs">Create sites like a pro</div>
              </div>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function NavMenuSmall() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"} className="box-content md:hidden">
            <AlignLeft />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]" side={"left"}>
          <SheetHeader>
            <SheetTitle>Are you sure absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
