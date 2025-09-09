// components/RequireGuest.tsx
import { useAuth } from "@/hooks/useAuth";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function RequireGuest({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
