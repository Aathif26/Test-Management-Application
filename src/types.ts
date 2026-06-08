import { z } from "zod";

export type TestStatus = "live" | "draft" | "unpublished" | "" | null;

export type TestType = "Chapter Wise" | "PYQ" | "Mock Test"

export const TEST_TYPES: TestType[] = ["Chapter Wise", "PYQ", "Mock Test"]

export type DifficultyLevel = "easy" | "medium" | "difficult"


export interface DashboardStatsProps {
  total: number;
  live: number;
  draft: number;
  unpublished: number;
  unassigned: number;
}

export interface TestItem {
  id: string;
  name: string;
  subject: string;
  topics: string[];
  status: string;
  created_at: string;
}

export interface TestsApiResponse {
  status: string;
  message: string;
  data: TestItem[];
}

// create test response
export interface CreateTestPayload {
  name: string;
  type: string;
  subject: string;
  topics: string[];
  sub_topics: string[];
  correct_marks: number;
  wrong_marks: number;
  unattempt_marks: number;
  difficulty: string;
  total_time: number;
  total_marks: number;
  total_questions: number;
  status: string | null;
}

export interface CreateTestResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    type: string;
    subject: string;
    topics: string[];
    sub_topics: string[];
    correct_marks: number;
    wrong_marks: number;
    unattempt_marks: number;
    difficulty: string;
    total_time: number;
    total_questions: number;
    status: string | null;
  };
}

// ─── Auth Types ──────────────────────────────────────────────

/** Authenticated user profile returned by the API */
export interface User {
  id: string;
  userId: string;
  name: string;
  role: string;
  subrole: string;
  phone: string;
  joiningDate: string;
  endDate: string;
  lastActive: string;
  payment: boolean;
}

/** Shape of the login API success response */
export interface LoginResponse {
  status: string;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

// Subjects
export interface SubjectItem {
  id: string;
  name: string;
}

export interface SubjectApiResponse {
  status: boolean;
  data: SubjectItem[];
}

// Get Topics by Subjects
export interface TopicItem {
  id: string;
  name: string;
  subject_id: string;
}

export interface TopicApiResponse {
  status: boolean;
  data: TopicItem[];
}

// Sub Topics By Topics
export interface SubTopicItem {
  id: string;
  name: string;
  topic_id: string;
}

export interface SubTopicApiResponse {
  status: boolean;
  data: SubTopicItem[];
}

// Get Tests by Subject
export interface TestsBySubjectItem {
  type: any;
  id: string;
  name: string;
  subject: string;
  topics: string[];
  sub_topics: string[];
  correct_marks: number;
  wrong_marks: number;
  unattempt_marks: number;
  difficulty: string;
  total_time: number;
  total_questions: number;
  status: string;
  created_at: string;
}

export interface TestsBySubjectApiResponse {
  status: string;
  data: TestsBySubjectItem[];
}

export interface GetTestByIdResponse {
  status: string;
  data: TestsBySubjectItem;
}

/** Generic API error shape returned by the backend */
export interface ApiError {
  status: string;
  message: string;
}

// ─── Zod Validation Schemas ─────────────────────────────────

export const testFormSchema = z.object({
  type: z.enum(["Chapter Wise", "PYQ", "Mock Test"]),
  subject: z.string().min(1, "Subject is required"),
  name: z
    .string()
    .min(1, "Test name is required")
    .max(100, "Test name must be 100 characters or less"),
  topics: z.array(z.string()).min(1, "At least one topic is required"),
  sub_topics: z.array(z.string()).min(1, "At least one sub-topic is required"),
  total_time: z
    .number()
    .positive("Duration must be a positive number"),
  difficulty: z.enum(["easy", "medium", "difficult"], { message: "Difficulty level is required" }),
  wrong_marks: z.number({ message: "Wrong answer mark is required" }),
  unattempt_marks: z.number({ message: "Unattempted mark is required" }),
  correct_marks: z
    .number({ message: "Correct answer mark is required" })
    .positive("Correct answer mark must be positive"),
  total_questions: z
    .number({ message: "Number of questions is required" })
    .int("Must be a whole number")
    .positive("Must be a positive number"),
  total_marks: z
    .number({ message: "Total marks is required" })
    .positive("Total marks must be a positive number"),
  status: z.string().nullable(),
});

export type TestFormSchema = z.infer<typeof testFormSchema>;


