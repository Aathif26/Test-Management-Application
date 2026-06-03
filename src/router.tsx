import { createBrowserRouter } from "react-router"

import GuestRoute from "@/features/auth/components/GuestRoute"
import ProtectedRoute from "@/features/auth/components/ProtectedRoute"

import LoginPage from "@/pages/LoginPage"
import DashboardPage from "@/pages/DashboardPage"
import CreateEditPage from "@/pages/CreateEditPage"
import AddQuestionPage from "@/pages/AddQuestionPage"
import PreviewPublishPage from "@/pages/PreviewPublishPage"

export const router = createBrowserRouter([
  // Guest-only routes (accessible only when NOT logged in)
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },

  // Protected routes (accessible only when logged in)
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/tests/new",
        element: <CreateEditPage />,
      },
      {
        path: "/tests/:id/edit",
        element: <CreateEditPage />,
      },
      {
        path: "/tests/:id/questions",
        element: <AddQuestionPage />,
      },
      {
        path: "/tests/:id/preview",
        element: <PreviewPublishPage />,
      },
    ],
  },
])
