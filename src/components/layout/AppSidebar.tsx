import { Link, useLocation } from "react-router"
import {
  LuLayoutDashboard,
  LuClipboardList,
} from "react-icons/lu"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"

const navItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LuLayoutDashboard,
  },
  {
    title: "Test Creation",
    url: "/tests/new",
    icon: "LuFileEdi",
  },
  {
    title: "Test Tracking",
    url: "/tracking",
    icon: LuClipboardList,
  },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar className="border-r bg-white" variant="sidebar">
      <SidebarHeader className="p-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <div className="w-40 mb-2">
            <img
              src="/LoginPage/preproute-logo.png"
              alt="PrepRoute Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 px-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.url || (item.url !== "/" && location.pathname.startsWith(item.url))

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} size="lg" className={isActive ? "bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600" : "text-gray-600"}>
                      <Link to={item.url}>
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
