import { TEST_TYPES, type TestType } from "@/types"

interface TestTypeTabsProps {
  value: TestType
  onChange: (type: TestType) => void
}

export function TestTypeTabs({ value, onChange }: TestTypeTabsProps) {
  return (
    <div className="flex flex-wrap items-center rounded-xl border border-slate-200/80 p-1.5 bg-white w-full sm:w-fit">
      {TEST_TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`w-fit px-4 py-1 sm:px-6 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:cursor-pointer ${
            value === type
              ? "bg-[#F8FAFF] text-[#384EC7] shadow-sm ring-1 ring-slate-200/50"
              : "text-[#9CA3AF] hover:text-slate-600 hover:bg-slate-100/50"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  )
}
