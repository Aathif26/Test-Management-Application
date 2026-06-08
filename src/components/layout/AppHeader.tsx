import { LuBell } from "react-icons/lu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { UserDropdown } from "./UserDropdown"

export function AppHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
      </div>

      <div className="flex items-center gap-6">
        {/* Notification bell */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">
          <LuBell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-green-500 ring-2 ring-white" />
        </button>

        <UserDropdown />
      </div>
    </header>
  )
}
