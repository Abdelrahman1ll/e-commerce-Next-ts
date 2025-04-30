"use client";

import UseResetCode from "./Reset-Code";

const ResetYourCode = () => {
  const {
    handleSubmit,
    email,
    setEmail,
    code,
    setCode,
    errors,
    timeLeft,
    minutes,
    seconds,
    isLoading,
  } = UseResetCode();
  return (
    <>
      <div
        dir="rtl"
        className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="text-center text-6xl font-bold  text-blue-600">
            HeaterPro
          </div>

          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            نسيت كلمة المرور
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                عنوان البريد الإلكتروني
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
                                    ${
                                      errors.email
                                        ? "outline-red-500"
                                        : "outline-gray-300"
                                    }

                  `}
                  placeholder="عنوان البريد الإلكتروني"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                {errors.email && (
                  <div className="mb-2 text-sm text-red-500">
                    {errors.email}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="code"
                className="block text-sm/6 font-medium text-gray-900"
              >
                ادخل كود التحقق
              </label>
              <div className="mt-2">
                <input
                  id="code"
                  name="code"
                  type="code"
                  required
                  autoComplete="code"
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
                                    ${
                                      errors.email
                                        ? "outline-red-500"
                                        : "outline-gray-300"
                                    }

                  `}
                  placeholder="ادخل كود التحقق"
                  onChange={(e) => setCode(e.target.value)}
                  value={code}
                />
                {errors.code && (
                  <div className="mb-2 text-sm text-red-500">{errors.code}</div>
                )}
              </div>
            </div>
            <div
              className={`text-center text-sm ${
                timeLeft < 20 ? "text-red-600" : "text-gray-600"
              }`}
            >
              {`الوقت المتبقي: ${minutes}:${
                seconds < 10 ? `0${seconds}` : seconds
              }`}
            </div>

            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>التحقق من الكود</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetYourCode;
