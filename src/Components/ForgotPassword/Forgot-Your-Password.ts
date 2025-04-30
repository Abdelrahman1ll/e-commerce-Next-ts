"use client";
import { useRouter } from "next/navigation";
import { SerializedError } from "@reduxjs/toolkit";
import { usePostForgotPasswordMutation } from "@/redux/Auth/ApiForgotPassword";
import React, { useState } from "react";
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
const UseForgotYourPassword = () => {
   
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({
      email: "",
    });
  
    const [postForgotPassword, { isLoading }] = usePostForgotPasswordMutation();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      let valid = true;
      const newErrors = { ...errors };
  
      if (!email.trim()) {
        newErrors.email = "البريد الإلكتروني مطلوب";
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "البريد الإلكتروني غير صالح";
        valid = false;
      } else {
        newErrors.email = "";
      }
      setErrors(newErrors);
      if (newErrors.email) return;
      if (valid) {
        try {
          await postForgotPassword({ email }).unwrap();
  
          setEmail("");
          notify("تم إرسال رمز التحقق", "success");
          router.push("/reset-code");
        } catch (error: unknown) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "",
          }));
  
          if (isApiError(error)) {
            if (
              error?.data?.message?.includes("User with this email does not exist")
            ) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                email: "البريد الإلكتروني غير صالح",
              }));
            } else {
              notify(" خطاء حاول مرة اخرى", "error");
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
      setEmail,
      errors,
      handleSubmit,
      isLoading,
    };
};

export default UseForgotYourPassword