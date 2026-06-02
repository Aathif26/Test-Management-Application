import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/features/auth/context/AuthContext";

/**
 * Layout route that guards its children behind authentication.
 * Unauthenticated users are redirected to /login.
 */
export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
