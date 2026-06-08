import { LuChevronDown, LuLogOut, LuUser, LuShield } from "react-icons/lu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "./UserAvatar"
import { useAuth } from "@/features/auth/context/AuthContext"

/** Generate initials from a full name (e.g. "Alex Wando" → "AW") */
function getInitials(name: string): string {
  return name.split(" ").filter(Boolean).map((p) => p[0].toUpperCase()).slice(0, 2).join("")
}

export function UserDropdown() {
  const { user, logout } = useAuth()
  const displayName = user?.name ?? "User"
  const displayRole = user?.role ?? "—"
  const displaySubrole = user?.subrole ?? ""
  const initials = getInitials(displayName)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors outline-none">
          <UserAvatar initials={initials} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">{displayName}</span>
            <span className="text-xs text-gray-500">{displayRole}</span>
          </div>
          <LuChevronDown className="h-4 w-4 text-gray-500 ml-2" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 bg-white border border-gray-200 shadow-lg rounded-xl p-0 overflow-hidden">
        {/* User header */}
        <div className="px-4 py-3 bg-gray-50/70">
          <div className="flex items-center gap-3">
            <UserAvatar initials={initials} />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-gray-900 truncate">{displayName}</span>
              {user?.userId && <span className="text-xs text-gray-500 truncate">@{user.userId}</span>}
            </div>
          </div>
        </div>

        <DropdownMenuSeparator className="m-0" />

        {/* Role info */}
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

        {/* Actions */}
        <div className="p-1">
          <DropdownMenuItem onClick={logout} className="gap-2 text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
            <LuLogOut className="h-4 w-4" /> Log out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
