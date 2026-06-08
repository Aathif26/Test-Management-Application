import { useNavigate } from "react-router"

interface PageErrorStateProps {
  message?: string
}

export function PageErrorState({ message = "Could not fetch the test details. Please go back and try again." }: PageErrorStateProps) {
  const navigate = useNavigate()
  return (
    <div className="h-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4 text-center max-w-sm">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-xl">✕</div>
        <div>
          <p className="font-semibold text-slate-800">Failed to load test</p>
          <p className="text-sm text-slate-500 mt-1">{message}</p>
        </div>
        <button onClick={() => navigate("/")} className="text-sm text-indigo-600 hover:underline">
          ← Back to Dashboard
        </button>
      </div>
    </div>
  )
}
