import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

import { routeNames } from "@/router/PublicRoutes";
export const RequireAdmin = ({
  children,
  fallback,
  redirectTo = "/",
}: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user)
    return <Navigate to={routeNames.login.navUrl} replace />;

  if (user?.role?.name?.toLowerCase() !== "admin") {
    return fallback ? <>{fallback}</> : <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
