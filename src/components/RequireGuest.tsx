// components/RequireGuest.tsx
import { useAuth } from "@/hooks/useAuth";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { adminRouteNames } from "@/router/AdminRoutes";
export default function RequireGuest({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={`/admin/${adminRouteNames.dashboard}`} replace />;
  }
  return children;
}
