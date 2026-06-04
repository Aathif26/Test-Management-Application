import { useQuery } from "@tanstack/react-query";
import { fetchTests } from "@/api/tests";
import type { TestItem } from "@/types";

export function useTests() {
  return useQuery({
    queryKey: ["tests"],
    queryFn: fetchTests,
    select: (response) => response.data,
  });
}

export function useTestStats(tests: TestItem[] | undefined) {
  const total = tests?.length ?? 0;
  const live = tests?.filter((t) => t.status === "live").length ?? 0;
  const draft = tests?.filter((t) => t.status === "draft").length ?? 0;
  const unpublished =
    tests?.filter((t) => t.status === "unpublished").length ?? 0;
  const unassigned = tests?.filter((t) => t.status === null).length ?? 0;

  return { total, live, draft, unpublished, unassigned };
}
