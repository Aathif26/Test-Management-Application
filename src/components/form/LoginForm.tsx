import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputField } from "../common/FormInputField";
import { loginSchema, type LoginFormData } from "../../features/auth/schemas/login.schema";
import { useLogin } from "../../features/auth/hooks/useLogin";

export default function LoginForm() {
    const { mutate: login, isPending, error } = useLogin();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            userId: "",
            password: ""
        }
    })

    const onSubmit = (data: LoginFormData) => {
        login(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
                {/* Server Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded-lg">
                        {error.response?.data?.message ?? "Login failed. Please try again."}
                    </div>
                )}

                <FormInputField
                    registration={register("userId")}
                    label="User ID"
                    type="text"
                    placeholder="Enter User ID"
                    error={errors.userId?.message}
                    className="rounded-sm"
                />

                <FormInputField
                    registration={register("password")}
                    label="Password"
                    type="password"
                    placeholder="Enter Password"
                    error={errors.password?.message}
                    className="rounded-sm"
                />

                {/* Forgot Password Link */}
                <div className="flex justify-start -mt-1">
                    <a href="#" className="text-[#3B82F6] hover:underline text-[13px] font-medium">
                        Forgot password?
                    </a>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[#4F7EF7] hover:bg-[#3A68DE] text-white font-medium text-[15px] py-2.5 rounded-lg mt-4 transition-colors duration-200 hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isPending ? "Logging in..." : "Login"}
                </button>
            </div>
        </form>
    )
}