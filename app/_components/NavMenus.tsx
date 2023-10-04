"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import clsx from "clsx";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type MenubarItem = {
  title: string;
  items: Array<MenubarCard>;
  image: any;
};

export type MenubarCard = {
  name: string;
  description?: string;
  listItems: Array<MenubarCardItem>;
};

export type MenubarCardItem = {
  label: string;
  href: string;
};

export function NavMenuLarge({
  className,
  menuItems,
}: {
  className?: string;
  menuItems: MenubarItem[];
}) {
  return (
    <Menubar className={className}>
      {menuItems.map((item, index) => (
        <MenubarMenu key={index}>
          <MenubarTrigger asChild>
            <Button
              variant={"link"}
              className="flex justify-between gap-1 text-xs h-6 text-left  hover:cursor-pointer border-none target:border-none"
            >
              {item.image}
              {item.title}
            </Button>
          </MenubarTrigger>
          <MenubarContent
            className="flex gap-1 mt-3 p-2 items-stretch"
            align="center"
          >
            {item.items.map((menuItem, index) => (
              <MenubarItem key={index} className="items-stretch flex ">
                <Card className="rounded-md w-40 overflow-hidden">
                  <CardHeader className="p-3 pb-1 bg-gray-50 border-b overflow-hidden">
                    <CardTitle>{menuItem.name}</CardTitle>
                    <CardDescription>{menuItem.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="px-1 py-2">
                    <ul className="list-none gap-2 flex flex-col">
                      {menuItem.listItems.map((listItem, index) => (
                        <Link key={index} href={listItem.href}>
                          <li className="flex flex-col">
                            <Button variant={"ghost"} className="justify-start">
                              {listItem.label}
                            </Button>
                          </li>
                        </Link>
                      ))}
                      <li></li>
                    </ul>
                  </CardContent>
                </Card>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      ))}
    </Menubar>
  );
}

export function NavMenuSmall() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"} className="box-content md:hidden">
            <HamburgerMenuIcon />
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
