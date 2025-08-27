import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu";

export const CustomMenu = () => {

  const { pathname } = useLocation();

  const isActive = (path: string) => {
    return pathname === path;
  }

  return (
    <NavigationMenu className="py-5">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={cn(isActive('/') && "bg-slate-200", "rounded-md p-2 font-medium")}>
            <Link to='/'>Inicio</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={cn(isActive('/search') && "bg-slate-200", "rounded-md p-2 font-medium")}>
            <Link to='/search'>Buscar Superheroes</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
