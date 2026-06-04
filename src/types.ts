export type TestStatus = "live" | "draft" | "unpublished" | "" | null;

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
  type: string;
  subject: string;
  topics: string[];
  sub_topics: string[];
  questions: string[];
  correct_marks: number;
  unattempt_marks: number;
  wrong_marks: number;
  difficulty: string;
  total_marks: number;
  total_time: number;
  total_questions: number;
  slot: string | null;
  hidden_from_moderator: boolean | null;
  created_by: number;
  created_at: string;
  updated_by: number;
  updated_at: string;
  paragraph_question: string | null;
  status: TestStatus;
  scheduled_date: string | null;
  expiry_date: string | null;
}

export interface TestsApiResponse {
  status: string;
  message: string;
  data: TestItem[];
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

/** Generic API error shape returned by the backend */
export interface ApiError {
  status: string;
  message: string;
}
