"use client";

import Link from "next/link";
import GoogleSigninButton from "../AuthGoogle/GoogleSigninButton";
import UseSignInComponents from "./SignIn-Components";
type Props = {
  name: string;
  lastName: string;
  email: string;
  number: string;
  password: string;
  passwordConfirmation: string;
};
const SignInComponents: React.FC<Props> = () => {
  const {
    name,
    setName,
    lastName,
    setLastName,
    email,
    setEmail,
    number,
    setNumber,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    errors,
    handleSubmit,
    isLoading,
  } = UseSignInComponents();
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
            انشاء حساب
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-4">
            <div>
              <div className="flex items-center gap-4 ">
                <div className="w-50">
                  <label
                    htmlFor="name"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    الاسم الاول
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
                        ${errors.name ? "outline-red-500" : "outline-gray-300"}
                        `}
                      placeholder="الاسم الاول"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                    {errors.name && (
                      <div className="mb-2 text-sm text-red-500">
                        {errors.name}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-50">
                  <label
                    htmlFor="name2"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    الاسم الثاني
                  </label>
                  <div className="mt-2">
                    <input
                      id="name2"
                      name="name2"
                      type="text"
                      required
                      autoComplete="name"
                      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
                        ${
                          errors.lastName
                            ? "outline-red-500"
                            : "outline-gray-300"
                        }
                        `}
                      placeholder="الاسم الثاني"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                    />
                    {errors.lastName && (
                      <div className="mb-2 text-sm text-red-500">
                        {errors.lastName}
                      </div>
                    )}
                  </div>
                </div>
              </div>

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
                      ${errors.email ? "outline-red-500" : "outline-gray-300"}
                      
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
                  htmlFor="phone"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  رقم الهاتف
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="phone"
                    required
                    autoComplete="phone"
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
                      ${errors.number ? "outline-red-500" : "outline-gray-300"}
                      
                      `}
                    placeholder="رقم الهاتف"
                    onChange={(e) => setNumber(e.target.value)}
                    value={number}
                  />
                  {errors.number && (
                    <div className="mb-2 text-sm text-red-500">
                      {errors.number}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    كلمة المرور
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
                      ${
                        errors.password ? "outline-red-500" : "outline-gray-300"
                      }
                      
                      `}
                    placeholder="كلمة المرور"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  {errors.password && (
                    <div className="mb-2 text-sm text-red-500">
                      {errors.password}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password2"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    تأكيد كلمة المرور
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password2"
                    name="password2"
                    type="password"
                    required
                    autoComplete="current-password"
                    className={`block w-full  rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
                      ${
                        errors.passwordConfirmation
                          ? "outline-red-500"
                          : "outline-gray-300"
                      }
                      `}
                    placeholder="تأكيد كلمة المرور"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    value={passwordConfirmation}
                  />
                  {errors.passwordConfirmation && (
                    <div className="mb-2 text-sm text-red-500">
                      {errors.passwordConfirmation}
                    </div>
                  )}
                </div>
              </div>
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
                  <span>انشاء حساب</span>
                )}
              </button>
            </div>
          </form>
          <div className="flex mt-5 items-center justify-center ">
            <GoogleSigninButton />
          </div>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            هل لديك حساب؟{" "}
            <Link href="/logIn">
              <span className="font-semibold text-blue-600 hover:text-blue-500 cursor-pointer">
                تسجيل الدخول
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignInComponents;
