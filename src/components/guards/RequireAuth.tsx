// components/RequireAuth.tsx
import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { routeNames } from "@/router/PublicRoutes";
export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={"/" + routeNames.login.url} replace />;
  }
  return children;
}
