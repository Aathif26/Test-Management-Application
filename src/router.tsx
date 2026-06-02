import { createBrowserRouter } from "react-router"

import LoginPage from "@/pages/LoginPage"
import DashboardPage from "@/pages/DashboardPage"
import CreateEditPage from "@/pages/CreateEditPage"
import AddQuestionPage from "@/pages/AddQuestionPage"
import PreviewPublishPage from "@/pages/PreviewPublishPage"

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
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
])
