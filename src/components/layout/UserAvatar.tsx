interface UserAvatarProps {
  initials: string
  size?: "sm" | "md"
}

/** Circular avatar showing user initials */
export function UserAvatar({ initials, size = "md" }: UserAvatarProps) {
  const dim = size === "sm" ? "h-8 w-8" : "h-10 w-10"
  return (
    <div className={`${dim} overflow-hidden rounded-full bg-orange-200 flex items-center justify-center border border-gray-200 shrink-0`}>
      <span className="text-sm font-semibold text-orange-700">{initials}</span>
    </div>
  )
}
