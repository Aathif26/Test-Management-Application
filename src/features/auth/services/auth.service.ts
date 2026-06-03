import apiClient from "@/lib/axios";
import type { LoginFormData } from "@/features/auth/schemas/login.schema";
import type { LoginResponse } from "@/features/auth/types/auth.types";

export const authService = {
  login: async (credentials: LoginFormData): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>("/auth/login", credentials);
    return data;
  },
};
