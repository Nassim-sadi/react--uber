import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import DashboardLayout from "@/layout/DashboardLayout";
import RequireAuth from "@/components/guards/RequireAuth";
import Home from "@/views/dashboard/Home";
import { RequireAdmin } from "@/components/guards/RequireAdmin";
import Shipments from "@/views/dashboard/shipments/Index";
import Users from "@/views/dashboard/users/Index";
import Settings from "@/views/dashboard/settings/Index";

export const adminRouteNames = {
  dashboard: {
    navUrl: "/admin/dashboard",
    url: "dashboard",
    name: "Dashboard",
  },
  users: {
    navUrl: "/admin/users",
    url: "users",
    name: "Users",
  },
  shipments: {
    navUrl: "/admin/shipments",
    url: "shipments",
    name: "Shipments",
  },
  settings: {
    navUrl: "/admin/settings",
    url: "settings",
    name: "Settings",
  },
  notFound: {
    navUrl: "/admin/*",
    url: "*",
    name: "Admin 404",
  },
};

export const routes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <RequireAdmin>
          <DashboardLayout />
        </RequireAdmin>
      </RequireAuth>
    ),
    children: [
      // default route when visiting /admin
      {
        path: "",
        element: <Navigate to={adminRouteNames.dashboard.url} replace />,
      },

      { path: adminRouteNames.dashboard.url, element: <Home /> },
      { path: adminRouteNames.shipments.url, element: <Shipments /> },
      { path: adminRouteNames.users.url, element: <Users /> },
      { path: adminRouteNames.settings.url, element: <Settings /> },
      // catch-all for /admin/*
      { path: adminRouteNames.notFound.url, element: <div>Admin 404</div> },
    ],
  },
];
