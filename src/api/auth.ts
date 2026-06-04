import apiClient from "@/lib/axios";
import type { LoginResponse } from "@/types";
import type { LoginFormData } from "@/features/auth/components/LoginForm";

export const authService = {
  login: async (credentials: LoginFormData): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>("/auth/login", credentials);
    return data;
  },
};
