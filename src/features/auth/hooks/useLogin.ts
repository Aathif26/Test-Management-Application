import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { authService } from "@/features/auth/services/auth.service";
import { useAuth } from "@/features/auth/context/AuthContext";
import type { LoginFormData } from "@/features/auth/schemas/login.schema";
import type { ApiError } from "@/features/auth/types/auth.types";

export function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    mutationFn: (credentials: LoginFormData) => authService.login(credentials),
    onSuccess: (data) => {
      login(data.data.token, data.data.user);
      navigate("/");
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error(
        "Login failed:",
        error.response?.data?.message ?? error.message
      );
    },
  });
}
