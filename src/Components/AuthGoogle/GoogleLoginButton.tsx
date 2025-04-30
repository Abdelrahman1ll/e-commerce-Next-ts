"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import {  useSession } from "next-auth/react";
import { usePostLogInMutation } from "../../redux/Auth/ApiAuth";
import notify from "../notify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { setAuthCookies } from "../utils/setAuthCookies";
const GoogleLoginButton = () => {
  const router = useRouter();

  const [postLogIn] = usePostLogInMutation();
  const { data: session } = useSession();
  const handleGoogleLogin = async () => {
    if (session) {
      const { email } = session.user || {};
      if (email) {
        try {
          const resLogIn = await postLogIn({
            email: email || "",
          }).unwrap();

          if (resLogIn.data) {
            notify("تم تسجيل الدخول بنجاح", "success");
            setAuthCookies(resLogIn.data.token, resLogIn.data.user);
            
            router.push("/");
          } else {
            Cookies.remove("userData");
            Cookies.remove("authToken");
            notify("خطاء في تسجيل الدخول حول مرة اخرى", "error");
          }
        } catch  {
          

          notify("خطاء في تسجيل الدخول حول مرة اخرى", "error");
        }
      }
    } else {
      
        notify("خطاء في تسجيل الدخول حول مرة اخرى", "error");
    
    }
  };
  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center w-full px-6 py-2 border border-gray-300 rounded-md shadow-md bg-white hover:bg-gray-100 transition cursor-pointer"
    >
      <span className="text-gray-700 font-medium">
        تسجيل الدخول باستخدام جوجل
      </span>
      <FcGoogle className="w-6 h-6 mr-2" />
    </button>
  );
};

export default GoogleLoginButton;
