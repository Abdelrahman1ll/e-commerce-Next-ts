"use client";

import { usePostLogInMutation } from "../../redux/Auth/ApiAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import notify from "../notify";
import { setAuthCookies } from "../utils/setAuthCookies";
import Cookies from "js-cookie";
const UseLogInComponents = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postLogIn, { isLoading }] = usePostLogInMutation();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  interface ApiError {
    data?: {
      message?: string;
    };
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { ...errors };
    // Validate Email
    if (!email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "البريد الإلكتروني غير صالح";
      valid = false;
    } else {
      newErrors.email = "";
    }

    // Validate Password
    if (!password) {
      newErrors.password = "كلمة المرور مطلوبة";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
      valid = false;
    } else {
      newErrors.password = "";
    }
    setErrors(newErrors);

    if (valid) {
      try {
        const res = await postLogIn({
          email,
          password,
        }).unwrap();
        notify("تم تسجيل الدخول بنجاح", "success");
        if (res.data) {
        
         setAuthCookies(res.data.token, res.data.user);

          router.push("/");
        } else {
          Cookies.remove("userData");
        }

        setEmail("");
        setPassword("");
      } catch (error: unknown) {
        console.error("خطأ في التسجيل:", error);

        setErrors((prev) => ({
          ...prev,
          email: "",
          password: "",
        }));
        if(error.data?.message === "البريد الإلكتروني أو كلمة المرور غير صحيحة"){
          setErrors((prev) => ({
            ...prev,
            email: "بريد الالكتروني او رمز التحقق غير صحيح",
            password: "بريد الالكتروني او رمز التحقق غير صحيح",
          }));
        }
        if (isApiError(error)) {
          if (
            error.data?.message?.includes("The email or password is incorrect.")
          ) {
            setErrors((prev) => ({
              ...prev,
              email: "بريد الالكتروني او رمز التحقق غير صحيح",
              password: "بريد الالكتروني او رمز التحقق غير صحيح",
            }));
            Cookies.remove("userData");
          } else if (error.data?.message) {
            notify("حدث خطأ غير متوقع", "error");
            Cookies.remove("userData");
          }
        } else {
          
          notify("حدث خطأ غير معروف", "error");
          Cookies.remove("userData");
        }
      }
    }
  };

  // دالة مساعدة للتحقق من نوع الخطأ
  function isApiError(error: unknown): error is ApiError {
    return typeof error === "object" && error !== null && "data" in error;
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    errors,
    isLoading,
  };
};

export default UseLogInComponents;
