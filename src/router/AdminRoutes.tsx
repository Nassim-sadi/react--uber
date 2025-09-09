import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import DashboardLayout from "@/layout/DashboardLayout";
import RequireAuth from "@/components/RequireAuth";
import Home from "@/views/dashboard/Home";

export const adminRouteNames = {
  dashboard: "dashboard",
  // users: "users",
  // settings: "settings",
  notFound: "*",
};

export const routes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      // default route when visiting /admin
      {
        path: "",
        element: <Navigate to={adminRouteNames.dashboard} replace />,
      },

      { path: adminRouteNames.dashboard, element: <Home /> },
      // { path: adminRouteNames.users, element: <Users /> },
      // { path: adminRouteNames.settings, element: <Settings /> },
      // catch-all for /admin/*
      { path: adminRouteNames.notFound, element: <div>Admin 404</div> },
    ],
  },
];
