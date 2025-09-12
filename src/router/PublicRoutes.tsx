import type { RouteObject } from "react-router-dom";
import Home from "@/views/Home";
import Profile from "@/views/Profile";
import Login from "@/views/auth/Login";
import RequireAuth from "@/components/guards/RequireAuth";
import RequireGuest from "@/components/guards/RequireGuest";
import Register from "@/views/auth/Register";
import About from "@/views/About";
import NotFound from "@/views/NotFound";
import Layout from "@/layout/Layout";
import Map from "@/MapPage";

export const routeNames = {
  home: { navUrl: "/", url: "/", name: "Home" },
  login: { navUrl: "/login", url: "login", name: "Login" },
  register: { navUrl: "/register", url: "register", name: "Register" },
  profile: { navUrl: "/profile", url: "profile", name: "Profile" },
  about: { navUrl: "/about", url: "about", name: "About" },
  notFound: { navUrl: "*", url: "*", name: "Not Found" },
  test: { navUrl: "/test", url: "test", name: "Test" },
};

export const routes: RouteObject[] = [
  {
    path: routeNames.home.url, // parent path "/"
    element: <Layout />,
    children: [
      // default child route for "/"
      { path: "", element: <Home /> },

      {
        path: routeNames.login.url,
        element: (
          <RequireGuest>
            <Login />
          </RequireGuest>
        ),
      },
      {
        path: routeNames.register.url,
        element: (
          <RequireGuest>
            <Register />
          </RequireGuest>
        ),
      },
      {
        path: routeNames.profile.url,
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ),
      },
      { path: routeNames.about.url, element: <About /> },

      //test
      { path: routeNames.test.url, element: <Map /> },

      // catch-all
      { path: routeNames.notFound.url, element: <NotFound /> },
    ],
  },
];
