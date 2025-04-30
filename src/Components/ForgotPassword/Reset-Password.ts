"use client";
import { usePostResetPasswordMutation } from "@/redux/Auth/ApiForgotPassword";
import { SerializedError } from "@reduxjs/toolkit";
import { useState } from "react";
import { useRouter } from "next/navigation";
import notify from "../notify";

interface ApiError extends SerializedError {
  data?: {
    message?: string;
    status?: string;
    error?: {
      statusCode?: number;
      isOperational?: boolean;
    };
  };
  status?: number;
}
const UseResetPassword = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState({
      email: "",
      password: "",
      passwordConfirmation: "",
    });
    const [postResetPassword, { isLoading }] = usePostResetPasswordMutation();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      let valid = true;
      const newErrors = { ...errors };
  
      if (!email.trim()) {
        newErrors.email = "البريد الالكتروني مطلوب";
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "البريد الالكتروني غير صالح";
        valid = false;
      } else {
        newErrors.email = "";
      }
  
      if (!password.trim()) {
        newErrors.password = "كلمة المرور مطلوبة";
        valid = false;
      } else if (password.length < 6) {
        newErrors.password = "كلمة المرور يجب ان تكون اكثر من 6 حروف";
        valid = false;
      } else {
        newErrors.password = "";
      }
  
      if (!passwordConfirmation.trim()) {
        newErrors.passwordConfirmation = "تاكيد كلمة المرور مطلوب";
        valid = false;
      } else if (password !== passwordConfirmation) {
        newErrors.passwordConfirmation = "كلمة المرور غير متطابقة";
        valid = false;
      } else {
        newErrors.passwordConfirmation = "";
      }
  
      setErrors(newErrors);
  
      if (valid) {
        try {
          await postResetPassword({
            email: email,
            password: password,
            passwordConfirm: passwordConfirmation,
          }).unwrap();
          setEmail("");
          setPassword("");
          setPasswordConfirmation("");
          router.push("/logIn");
        } catch (error) {
          if (isApiError(error)) {
            if (
              error.data?.message?.includes("Reset code has already been used.")
            ) {
              notify("تم استخدام رمز التحقق من قبل", "error");
            } else {
              notify("خطاء في تغيير كلمة المرور", "error");
            }
          }
        }
      }
    };
    function isApiError(error: unknown): error is ApiError {
      return (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof error.data === "object" &&
        error.data !== null
      );
    }

    return {
      email,
      password,
      passwordConfirmation,
      errors,
      isLoading,
      handleSubmit,
      setEmail,
      setPassword,
      setPasswordConfirmation,
    }
};

export default UseResetPassword;