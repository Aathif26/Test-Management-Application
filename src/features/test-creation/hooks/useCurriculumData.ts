import { useQuery } from "@tanstack/react-query"
import { getAllSubjects, getTopicsBySubjectId, getSubTopicsByTopicId } from "@/api/tests"

/**
 * Fetches all subjects on mount. Results are cached globally.
 */
export function useSubjects() {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: getAllSubjects,
    staleTime: 5 * 60 * 1000, // 5 minutes — subjects rarely change
    select: (data) =>
      data.data.map((s) => ({ value: s.id, label: s.name })),
  })
}

/**
 * Fetches topics for a given subject ID.
 * Only fires when subjectId is truthy (lazy loading).
 */
export function useTopics(subjectId: string) {
  return useQuery({
    queryKey: ["topics", subjectId],
    queryFn: () => getTopicsBySubjectId(subjectId),
    enabled: !!subjectId,
    staleTime: 5 * 60 * 1000,
    select: (data) =>
      data.data.map((t) => ({ value: t.id, label: t.name })),
  })
}

/**
 * Fetches sub-topics for a given topic ID.
 * Only fires when topicId is truthy (lazy loading).
 */
export function useSubTopics(topicIds: string[] | string) {
  const ids = Array.isArray(topicIds) ? topicIds : (topicIds ? [topicIds] : []);
  return useQuery({
    queryKey: ["subTopics", ids],
    queryFn: async () => {
      if (ids.length === 0) return { status: true, data: [] };
      const promises = ids.map(id => getSubTopicsByTopicId(id));
      const results = await Promise.all(promises);
      const allSubTopics = results.flatMap(r => r.data || []);
      return { status: true, data: allSubTopics };
    },
    enabled: ids.length > 0,
    staleTime: 5 * 60 * 1000,
    select: (data) =>
      data.data.map((st) => ({ value: st.id, label: st.name })),
  })
}
