import { Outlet } from "react-router"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { AppHeader } from "./AppHeader"

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#fafafa]">
        <AppHeader />
        <div className="flex-1 px-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
