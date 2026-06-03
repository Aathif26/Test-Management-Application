import { LuBell, LuChevronDown, LuLogOut, LuUser, LuShield } from "react-icons/lu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useAuth } from "@/features/auth/context/AuthContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

/** Generate initials from a full name (e.g. "Alex Wando" → "AW") */
function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase())
    .slice(0, 2)
    .join("")
}

export function AppHeader() {
  const { user, logout } = useAuth()

  const displayName = user?.name ?? "User"
  const displayRole = user?.role ?? "—"
  const displaySubrole = user?.subrole ?? ""
  const initials = getInitials(displayName)

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        {/* We can put global search or breadcrumbs here if we wanted them in the header */}
      </div>

      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">
          <LuBell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-green-500 ring-2 ring-white" />
        </button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors outline-none">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-orange-200 flex items-center justify-center border border-gray-200">
                <span className="text-sm font-semibold text-orange-700">{initials}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">{displayName}</span>
                <span className="text-xs text-gray-500">{displayRole}</span>
              </div>
              <LuChevronDown className="h-4 w-4 text-gray-500 ml-2" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64 bg-white border border-gray-200 shadow-lg rounded-xl p-0 overflow-hidden">
            {/* ── User details header ── */}
            <div className="px-4 py-3 bg-gray-50/70">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-orange-200 flex items-center justify-center border border-gray-200">
                  <span className="text-sm font-semibold text-orange-700">{initials}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-gray-900 truncate">{displayName}</span>
                  {user?.userId && (
                    <span className="text-xs text-gray-500 truncate">@{user.userId}</span>
                  )}
                </div>
              </div>
            </div>

            <DropdownMenuSeparator className="m-0" />

            {/* ── Info items ── */}
            <div className="p-1">
              <DropdownMenuItem className="gap-2 cursor-default focus:bg-transparent">
                <LuShield className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-700">Role: <span className="font-medium">{displayRole}</span></span>
              </DropdownMenuItem>

              {displaySubrole && (
                <DropdownMenuItem className="gap-2 cursor-default focus:bg-transparent">
                  <LuUser className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">Sub-role: <span className="font-medium">{displaySubrole}</span></span>
                </DropdownMenuItem>
              )}
            </div>

            <DropdownMenuSeparator className="m-0" />

            {/* ── Actions ── */}
            <div className="p-1">
              <DropdownMenuItem
                onClick={logout}
                className="gap-2 text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
              >
                <LuLogOut className="h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
