import LoginForm from "@/components/form/LoginForm";

export default function LoginPage() {
  return (
    <main id="login-page">
      <section className="bg-[#F7FBFF] w-full">
        <div className="flex w-full h-screen">

          {/* Left Column - Banner Image (Hidden on Mobile) */}
          <div className="hidden lg:block lg:w-7/12">
            <img
              src="/LoginPage/login-banner.png"
              alt="Login Banner"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column - Form */}
          <div className="w-full lg:w-6/12 p-6 md:p-4 lg:p-2">
            <div className="bg-white border border-[#60A5FA] rounded-xl h-full flex flex-col items-center justify-center">

              <div className="w-full px-6 sm:px-8 gap-4">
                <div className="max-w-105 mx-auto">
                  {/* Logo */}
                  <div className="w-40 mb-2">
                    <img
                      src="/LoginPage/preproute-logo.png"
                      alt="PrepRoute Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Header */}
                  <div className="flex flex-col gap-1 mb-8">
                    <h2 className="text-[28px] font-bold text-[#1F2937]">Login</h2>
                    <p className="text-[13px] text-[#6B7280] font-medium">Use your company provided Login credentials</p>
                  </div>

                  {/* Form Fields */}
                  <LoginForm />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
