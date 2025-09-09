import type { RouteObject } from "react-router-dom";
import Home from "@/views/Home";
import Profile from "@/views/Profile";
import Login from "@/views/auth/Login";
import RequireAuth from "@/components/RequireAuth";
import RequireGuest from "@/components/ReauireGuest";
import Register from "@/views/auth/Register";
import About from "@/views/About";
import NotFound from "@/views/NotFound";
import Dashboard from "@/views/dashboard/Index";

export const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  {
    path: "/login",
    element: (
      <RequireGuest>
        <Login />
      </RequireGuest>
    ),
  },
  {
    path: "/register",
    element: (
      <RequireGuest>
        <Register />
      </RequireGuest>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <RequireAuth>
        <Dashboard />
      </RequireAuth>
    ),
  },
  {
    path: "/profile",
    element: (
      <RequireAuth>
        <Profile />
      </RequireAuth>
    ),
  },
  {
    path: "/about",
    element: <About />,
  },
  { path: "*", element: <NotFound /> },
];
