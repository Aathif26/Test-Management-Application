import { useNavigate } from "react-router"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface TestCreationBreadcrumbProps {
  /** The dynamic last segment (e.g. "Chapter Wise", "PYQ", "Mock Test") */
  currentStep: string
  /** "Create Test" or "Edit Test" */
  actionLabel?: string
}

export function TestCreationBreadcrumb({
  currentStep,
  actionLabel = "Create Test",
}: TestCreationBreadcrumbProps) {
  const navigate = useNavigate()

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-sm sm:text-base text-[#00000099] font-normal">
        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            onClick={(e) => {
              e.preventDefault()
              navigate("/")
            }}
            className="hover:text-slate-900 transition-colors"
          >
            Test Creation
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            onClick={(e) => e.preventDefault()}
            className="hover:text-slate-900 transition-colors"
          >
            {actionLabel}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-slate-900">{currentStep}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
