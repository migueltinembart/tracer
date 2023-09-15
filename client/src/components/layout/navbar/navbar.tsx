import { Outlet, Link } from "react-router-dom";

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
import { NavBarAvatar } from "./dashBoardAvatar";
import { Button } from "@/components/ui/button";

export type Props = {
  className?: string;
};

export function NavBar(props: Props) {
  return (
    <div className="flex flex-col mb-6 shadow-md">
      <div className={` ${props.className}`}>
        <div className="navbar-start">
          <span className="text-lg">
            <Link to="/">tracer</Link>
          </span>
        </div>
        <div className="navbar-center max-md:hidden">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="my-2">
                  <Link to={"/entities"}>Entities</Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="my-2">
                  Device Management
                </NavigationMenuTrigger>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="my-2">
                  Documentation
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="p-2 flex gap-6 navbar-end">
          <div className="flex items-center space-x-2">
            <Switch id="Dark-mode" />
            <Label htmlFor="dark-mode">Color Mode</Label>
          </div>
          <NavBarAvatar></NavBarAvatar>
        </div>
      </div>
      <div className="py-1 text-sm px-6 md:hidden lg:hidden">Test</div>
    </div>
  );
}
