import { Outlet, Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type Props = {
  className?: string;
};

export function NavBar(props: Props) {
  return (
    <div className="flex flex-col mb-6 shadow-md">
      <div className={` ${props.className}`}>
        <div className="navbar-start">
          <span className="text-lg">tracer</span>
        </div>
        <div className="navbar-center max-md:hidden">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="my-2">
                  Entities
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-row gap-2">
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link to={"/"}>
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Tenants
                          </div>
                          <p className="text-md">
                            Create Tenants which can house their own sites and
                            contacts
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li className="">
                      <NavigationMenuLink asChild>
                        <Link to={"/"}>
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Tenants
                          </div>
                          <p className="text-md">
                            Create Tenants which can house their own sites and
                            contacts
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li className="">
                      <NavigationMenuLink asChild>
                        <Link to={"/"}>
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Tenants
                          </div>
                          <p className="text-md">
                            Create Tenants which can house their own sites and
                            contacts
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li className="">
                      <NavigationMenuLink asChild>
                        <Link to={"/"}>
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Tenants
                          </div>
                          <p className="text-md">
                            Create Tenants which can house their own sites and
                            contacts
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="my-2">
                  Device Management
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-row gap-2">
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link to={"/"}>
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Tenants
                          </div>
                          <p className="text-md">
                            Create Tenants which can house their own sites and
                            contacts
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li className="">
                      <NavigationMenuLink asChild>
                        <Link to={"/"}>
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Tenants
                          </div>
                          <p className="text-md">
                            Create Tenants which can house their own sites and
                            contacts
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li className="">
                      <NavigationMenuLink asChild>
                        <Link to={"/"}>
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Tenants
                          </div>
                          <p className="text-md">
                            Create Tenants which can house their own sites and
                            contacts
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li className="">
                      <NavigationMenuLink asChild>
                        <Link to={"/"}>
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Tenants
                          </div>
                          <p className="text-md">
                            Create Tenants which can house their own sites and
                            contacts
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="my-2">
                  Documentation
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-row gap-2">
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a href={"/docs"}>
                          <div className="mb-2 mt-4 text-lg font-medium">
                            API Docs
                          </div>
                          <p className="text-md">
                            Create Tenants which can house their own sites and
                            contacts
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="p-2 flex gap-6 navbar-end">
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Color Mode</Label>
          </div>

          <Avatar className="w-9 h-9">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="py-1 text-sm px-6 md:hidden lg:hidden">Test</div>
    </div>
  );
}
