import { useState, useEffect, useMemo } from "react"
import { useParams, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import type { AxiosError } from "axios"

import { useSubjects, useTopics, useSubTopics } from "./useCurriculumData"
import { createTest, updateTest, getTestById } from "@/api/tests"
import { testFormSchema, type TestFormSchema } from "@/types"
import type { CreateTestPayload } from "@/types"
import { TYPE_REVERSE_MAP, TEST_TYPE_MAP, resolveToId, resolveToIds } from "@/lib/testTypeMap"

const DEFAULT_FORM_DATA: TestFormSchema = {
  name: "", type: "Chapter Wise", subject: "", topics: [], sub_topics: [],
  correct_marks: 5, wrong_marks: -1, unattempt_marks: 0,
  difficulty: "easy", total_time: 0, total_questions: 0, total_marks: 0, status: "draft",
}

/**
 * Encapsulates all form state, queries, ID resolution, cascading resets,
 * and submission logic for the Create / Edit test page.
 */
export function useTestForm() {
  const { id } = useParams<{ id: string }>()
  const isEditing = Boolean(id)
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formInitialized, setFormInitialized] = useState(!isEditing)

  const form = useForm<TestFormSchema>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: zodResolver(testFormSchema),
  })
  const { control, register, handleSubmit, watch, setValue, reset, clearErrors, formState: { errors } } = form

  const watchedType = watch("type")
  const watchedSubject = watch("subject")
  const watchedTopics = watch("topics")

  // ── Fetch existing test (edit mode) ──────────────────────────────────
  const { data: testData, isLoading: testLoading, isError: testError } = useQuery({
    queryKey: ["test", id],
    queryFn: () => getTestById(id!),
    enabled: isEditing && !!id,
    select: (res) => res.data,
    staleTime: 0,
    retry: 1,
  })

  // ── Curriculum data (cascading) ───────────────────────────────────────
  const { data: subjectOptions = [], isLoading: subjectsLoading } = useSubjects()

  const subjectIdForQuery = useMemo(() => {
    if (formInitialized) return watchedSubject
    return resolveToId(testData?.subject ?? "", subjectOptions) || watchedSubject
  }, [formInitialized, watchedSubject, testData?.subject, subjectOptions])

  const { data: topicOptions = [], isLoading: topicsLoading } = useTopics(subjectIdForQuery)

  const topicIdsForQuery = useMemo(() => {
    if (formInitialized) return watchedTopics
    const resolved = resolveToIds(testData?.topics ?? [], topicOptions)
    return resolved.length ? resolved : watchedTopics
  }, [formInitialized, watchedTopics, testData?.topics, topicOptions])

  const { data: subTopicOptions = [], isLoading: subTopicsLoading } = useSubTopics(topicIdsForQuery)

  // ── Resolved IDs for seeding ──────────────────────────────────────────
  const resolvedSubjectId = useMemo(() => resolveToId(testData?.subject ?? "", subjectOptions), [testData?.subject, subjectOptions])
  const resolvedTopicIds = useMemo(() => resolveToIds(testData?.topics ?? [], topicOptions), [testData?.topics, topicOptions])
  const resolvedSubTopicIds = useMemo(() => resolveToIds(testData?.sub_topics ?? [], subTopicOptions), [testData?.sub_topics, subTopicOptions])

  // ── Seed form once all IDs are ready (edit mode only) ────────────────
  useEffect(() => {
    if (!isEditing || !testData || formInitialized) return
    const subjectReady = !testData.subject || !!resolvedSubjectId
    const topicsReady = !testData.topics?.length || resolvedTopicIds.length === testData.topics.length
    const subTopicsReady = !testData.sub_topics?.length || resolvedSubTopicIds.length === testData.sub_topics.length
    if (!subjectReady || !topicsReady || !subTopicsReady) return

    reset({
      name: testData.name ?? "",
      type: (TYPE_REVERSE_MAP[testData.type] ?? "Chapter Wise") as TestFormSchema["type"],
      subject: resolvedSubjectId,
      topics: resolvedTopicIds,
      sub_topics: resolvedSubTopicIds,
      correct_marks: testData.correct_marks ?? 0,
      wrong_marks: testData.wrong_marks ?? 0,
      unattempt_marks: testData.unattempt_marks ?? 0,
      difficulty: (testData.difficulty ?? "easy") as TestFormSchema["difficulty"],
      total_time: testData.total_time ?? 0,
      total_questions: testData.total_questions ?? 0,
      total_marks: 0,
      status: testData.status ?? "draft",
    })
    setFormInitialized(true)
  }, [isEditing, testData, formInitialized, resolvedSubjectId, resolvedTopicIds, resolvedSubTopicIds, reset])

  // ── Cascading reset handlers ──────────────────────────────────────────
  const handleSubjectChange = () => { setValue("topics", []); setValue("sub_topics", []) }
  const handleTopicChange = () => { setValue("sub_topics", []) }

  // ── Submit ────────────────────────────────────────────────────────────
  const mapFormToPayload = (data: TestFormSchema): CreateTestPayload => ({
    name: data.name, type: TEST_TYPE_MAP[data.type] ?? data.type,
    subject: data.subject, topics: data.topics, sub_topics: data.sub_topics,
    correct_marks: data.correct_marks, wrong_marks: data.wrong_marks,
    unattempt_marks: data.unattempt_marks, difficulty: data.difficulty,
    total_time: data.total_time, total_questions: data.total_questions,
    total_marks: data.total_marks, status: "draft",
  })

  const onSubmit = async (data: TestFormSchema) => {
    setIsSubmitting(true)
    try {
      const payload = mapFormToPayload(data)
      if (isEditing && id) {
        const res = await updateTest(id, payload)
        toast.success(res.message || "Test updated!", { description: `"${res.data.name}" has been updated.` })
        navigate("/")
      } else {
        const res = await createTest(payload)
        toast.success(res.message || "Test created!", { description: `"${res.data.name}" has been saved as a draft.` })
        navigate(`/tests/${res.data.id}/questions`, { state: { testData: res.data } })
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>
      toast.error(isEditing ? "Failed to update test" : "Failed to create test", {
        description: axiosError.response?.data?.message ?? axiosError.message ?? "Something went wrong.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isPageLoading = isEditing && (testLoading || subjectsLoading || !formInitialized)

  return {
    isEditing, isSubmitting, isPageLoading, testError,
    control, register, errors, handleSubmit, onSubmit,
    watchedType, watchedSubject, watchedTopics,
    setValue, clearErrors,
    subjectOptions, topicOptions, subTopicOptions,
    subjectsLoading, topicsLoading, subTopicsLoading,
    handleSubjectChange, handleTopicChange,
  }
}
