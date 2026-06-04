import { lazy, Suspense } from "react"
import { createBrowserRouter } from "react-router"

import GuestRoute from "@/features/auth/components/GuestRoute"
import ProtectedRoute from "@/features/auth/components/ProtectedRoute"

// Route-level code splitting — each page becomes its own async chunk
const LoginPage = lazy(() => import("@/pages/LoginPage"))
const DashboardPage = lazy(() => import("@/pages/DashboardPage"))
const CreateEditPage = lazy(() => import("@/pages/CreateEditPage"))
const AddQuestionPage = lazy(() => import("@/pages/AddQuestionPage"))
const PreviewPublishPage = lazy(() => import("@/pages/PreviewPublishPage"))

// Minimal loading fallback shown while a lazy chunk is being fetched
const PageLoader = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
    <div style={{ width: 32, height: 32, borderRadius: "50%", border: "3px solid #e2e8f0", borderTopColor: "#6366f1", animation: "spin 0.7s linear infinite" }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
)

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<PageLoader />}>{element}</Suspense>
)

export const router = createBrowserRouter([
  // Guest-only routes (accessible only when NOT logged in)
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/login",
        element: withSuspense(<LoginPage />),
      },
    ],
  },

  // Protected routes (accessible only when logged in)
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: withSuspense(<DashboardPage />),
      },
      {
        path: "/tests/new",
        element: withSuspense(<CreateEditPage />),
      },
      {
        path: "/tests/:id/edit",
        element: withSuspense(<CreateEditPage />),
      },
      {
        path: "/tests/:id/questions",
        element: withSuspense(<AddQuestionPage />),
      },
      {
        path: "/tests/:id/preview",
        element: withSuspense(<PreviewPublishPage />),
      },
    ],
  },
])

