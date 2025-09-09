import { routes as AdminRoutes } from "@/router/AdminRoutes";
import { routes as PublicRoutes } from "@/router/PublicRoutes";
import { useRoutes } from "react-router-dom";

export default function AppRoutes() {
  const routes = [...PublicRoutes, ...AdminRoutes];
  return useRoutes(routes);
}
