interface PageLoadingStateProps {
  message?: string
}

export function PageLoadingState({ message = "Loading…" }: PageLoadingStateProps) {
  return (
    <div className="h-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3 text-slate-500">
        <div className="w-8 h-8 rounded-full border-[3px] border-slate-200 border-t-indigo-500 animate-spin" />
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  )
}
