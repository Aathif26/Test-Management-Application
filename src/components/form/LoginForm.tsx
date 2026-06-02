import { InputField } from "../common/InputField";

export default function LoginForm() {
    return (
        <>
            <div className="flex flex-col gap-6">
                <InputField
                    name="username"
                    label="User ID"
                    type="text"
                    placeholder="Enter User ID"
                    value=""
                    onChange={() => { }}
                    error=""
                    className="rounded-sm"
                />

                <InputField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter Password"
                    value=""
                    onChange={() => { }}
                    error=""
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
                    type="button"
                    className="w-full bg-[#4F7EF7] hover:bg-[#3A68DE] text-white font-medium text-[15px] py-2.5 rounded-lg mt-4 transition-colors duration-200"
                >
                    Login
                </button>
            </div>
        </>
    )
}