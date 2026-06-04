import { Link, useLocation } from "react-router"
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { TbClipboardSearch } from "react-icons/tb";

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
import { FaArrowTrendUp } from "react-icons/fa6"

const navItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: FaArrowTrendUp,
  },
  {
    title: "Test Creation",
    url: "/tests/new",
    icon: HiOutlinePencilSquare,
  },
  {
    title: "Test Tracking",
    url: "/tracking",
    icon: TbClipboardSearch,
  },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar className="border-r bg-white" variant="sidebar">
      <SidebarHeader className="p-6">
        <Link to="/">
          <div className="w-40 mb-2">
            <img
              src="/images/login/preproute-logo.png"
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
                    <SidebarMenuButton asChild isActive={isActive} size="lg" className={isActive ? "bg-[#F8FAFF] text-[#384EC7] hover:bg-[#625BF60D] hover:text-[#384EC7] border-l-4 border-[#384EC7]" : "text-[#6B7180]"}>
                      <Link to={item.url}>
                        <item.icon className="h-7 w-7" />
                        <span className="font-normal text-lg">{item.title}</span>
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
