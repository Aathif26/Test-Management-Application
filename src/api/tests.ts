import apiClient from "@/lib/axios";
import type { TestsApiResponse, CreateTestPayload, CreateTestResponse, SubjectApiResponse, TopicApiResponse, SubTopicApiResponse, GetTestByIdResponse } from "@/types";

// Get All Tests
export async function fetchTests(): Promise<TestsApiResponse> {
  const response = await apiClient.get<TestsApiResponse>("/tests");
  return response.data;
}

// Get All Subjects
export async function getAllSubjects(): Promise<SubjectApiResponse> {
  const response = await apiClient.get<SubjectApiResponse>("/subjects");
  return response.data;
}

// Get All Topics by Subject ID
export async function getTopicsBySubjectId(subjectId: string): Promise<TopicApiResponse> {
  const response = await apiClient.get<TopicApiResponse>(`/topics/subject/${subjectId}`);
  return response.data;
}

// Get Sub-topics by Topic ID
export async function getSubTopicsByTopicId(topicId: string): Promise<SubTopicApiResponse> {
  const response = await apiClient.get<SubTopicApiResponse>(`/sub-topics/topic/${topicId}`);
  return response.data;
}

// Create Tests
export async function createTest(payload: CreateTestPayload): Promise<CreateTestResponse> {
  const response = await apiClient.post<CreateTestResponse>("/tests", payload);
  return response.data;
}

// Get Test by ID
export async function getTestById(id: string): Promise<GetTestByIdResponse> {
  const response = await apiClient.get<GetTestByIdResponse>(`/tests/${id}`);
  return response.data;
}

// update test by id
export async function updateTest(id: string, payload: CreateTestPayload): Promise<CreateTestResponse> {
  const response = await apiClient.put<CreateTestResponse>(`/tests/${id}`, payload);
  return response.data;
}
