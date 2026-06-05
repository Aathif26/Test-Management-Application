export type TestType = "Chapter Wise" | "PYQ" | "Mock Test"

export const TEST_TYPES: TestType[] = ["Chapter Wise", "PYQ", "Mock Test"]

export type DifficultyLevel = "easy" | "medium" | "difficult"

export interface TestFormData {
  testType: TestType
  subject: string
  testName: string
  topic: string
  subTopic: string
  duration: string
  difficulty: DifficultyLevel
  wrongAnswerMark: number
  unattemptedMark: number
  correctAnswerMark: number
  numberOfQuestions: string
  totalMarks: string
}

export const DEFAULT_FORM_DATA: TestFormData = {
  testType: "Chapter Wise",
  subject: "",
  testName: "",
  topic: "",
  subTopic: "",
  duration: "",
  difficulty: "easy",
  wrongAnswerMark: -1,
  unattemptedMark: 0,
  correctAnswerMark: 5,
  numberOfQuestions: "",
  totalMarks: "",
}
