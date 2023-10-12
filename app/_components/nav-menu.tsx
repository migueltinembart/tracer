"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MenubarItem } from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { list } from "@/app/_configuration/pages";
import clsx from "clsx";

export type MenubarItem = {
  title: string;
  cards: Array<MenubarCard>;
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

export function NavMenuLarge({ className }: { className?: string }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {list.map((item, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuTrigger className="flex gap-1">
              {item.image}
              {item.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul
                className={clsx([
                  "grid",
                  "gap-3",
                  "p-4",
                  "md:w-[400px]",
                  "lg:w-[500px]",
                  "lg:grid-cols-[.75fr_1fr]",
                ])}
              >
                {item.cards.map((card, index) => (
                  <li
                    className={clsx([
                      "col-span-1",
                      
                    ])}
                    key={index}
                  >
                    
                    <div className="flex flex-col justify-end h-full p-6 no-underline transition-all duration-300 ease-in-out delay-150 rounded-md outline-none bg-gradient-to-b from-muted/50 to-muted focus:shadow-md">
                      <span className="mt-4 mb-2 text-lg font-semibold">
                        {card.name}
                      </span>
                      <p className="text-sm leading-tight text-muted-foreground pb-4">
                        {card.description}
                      </p>
                      <div className="flex-1 flex flex-col gap-2">
                        {card.listItems.map((cardItem, index) => (
                          <Link href={cardItem.href} passHref key={index}>
                            <NavigationMenuLink asChild>
                              <Button variant={"link"} className="px-0">{cardItem.label}</Button>
                            </NavigationMenuLink>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
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
