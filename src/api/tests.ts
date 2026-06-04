import apiClient from "@/lib/axios";
import type { TestsApiResponse } from "@/types";

export async function fetchTests(): Promise<TestsApiResponse> {
  const response = await apiClient.get<TestsApiResponse>("/tests");
  return response.data;
}
