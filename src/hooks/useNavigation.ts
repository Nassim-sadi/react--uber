// src/hooks/useNavigation.ts
import { useMemo } from "react";
import { routeNames } from "@/router/PublicRoutes";
import { adminRouteNames } from "@/router/AdminRoutes";
import {
  LayoutDashboardIcon,
  Settings2Icon,
  TruckIcon,
  UsersIcon,
} from "lucide-react";

export const useNavigation = () => {
  const navItems = useMemo(
    () => [
      { name: routeNames.home.name, path: routeNames.home.navUrl },
      { name: routeNames.about.name, path: routeNames.about.navUrl },
      {
        name: adminRouteNames.dashboard.name,
        path: adminRouteNames.dashboard.navUrl,
      },
      { name: adminRouteNames.users.name, path: adminRouteNames.users.navUrl },
    ],
    []
  );

  const authBtns = useMemo(
    () => [
      { name: routeNames.login.name, path: routeNames.login.navUrl },
      { name: routeNames.register.name, path: routeNames.register.navUrl },
    ],
    []
  );

  const authNavItems = useMemo(
    () => [
      { name: routeNames.profile.name, path: routeNames.profile.navUrl },
      { name: "Logout", path: "/logout" },
    ],
    []
  );

  const adminNavItems = useMemo(
    () => [
      {
        title: adminRouteNames.dashboard.name,
        path: adminRouteNames.dashboard.navUrl,
        icon: LayoutDashboardIcon,
      },
      {
        title: adminRouteNames.users.name,
        path: adminRouteNames.users.navUrl,
        icon: UsersIcon,
      },
      {
        title: adminRouteNames.shipments.name,
        path: adminRouteNames.shipments.navUrl,
        icon: TruckIcon,
      },
      {
        title: adminRouteNames.settings.name,
        path: adminRouteNames.settings.navUrl,
        icon: Settings2Icon,
      },
    ],
    []
  );

  return {
    navItems,
    authBtns,
    authNavItems,
    adminNavItems,
  };
};
