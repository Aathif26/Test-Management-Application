import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/features/auth/context/AuthContext";

/**
 * Layout route for guest-only pages (e.g. login).
 * Already-authenticated users are redirected to the dashboard.
 */
export default function GuestRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
