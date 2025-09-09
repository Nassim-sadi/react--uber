import type { RouteObject } from "react-router-dom";
import Home from "@/views/Home";
import Profile from "@/views/Profile";
import Login from "@/views/auth/Login";
import RequireAuth from "@/components/RequireAuth";
import RequireGuest from "@/components/RequireGuest";
import Register from "@/views/auth/Register";
import About from "@/views/About";
import NotFound from "@/views/NotFound";
import Layout from "@/layout/Layout";

export const routeNames = {
  home: "/",
  login: "login",
  register: "register",
  profile: "profile",
  about: "about",
  notFound: "*",
};

export const routes: RouteObject[] = [
  {
    path: routeNames.home, // parent path "/"
    element: <Layout />,
    children: [
      // default child route for "/"
      { path: "", element: <Home /> },

      {
        path: routeNames.login,
        element: (
          <RequireGuest>
            <Login />
          </RequireGuest>
        ),
      },
      {
        path: routeNames.register,
        element: (
          <RequireGuest>
            <Register />
          </RequireGuest>
        ),
      },
      {
        path: routeNames.profile,
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ),
      },
      { path: routeNames.about, element: <About /> },

      // catch-all
      { path: routeNames.notFound, element: <NotFound /> },
    ],
  },
];
