"use client";
import { usePostResetCodeMutation } from "@/redux/Auth/ApiForgotPassword";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import notify from "../notify";
import { SerializedError } from "@reduxjs/toolkit";

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

const UseResetCode = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    code: "",
  });

  const [timeLeft, setTimeLeft] = useState(100);
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const [postResetCode, { isLoading }] = usePostResetCodeMutation();
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

    if (!code.trim()) {
      newErrors.code = "رمز التحقق مطلوب";
      valid = false;
    } else {
      newErrors.code = "";
    }
    setErrors(newErrors);
    if (newErrors.email) return;

    if (valid) {
      try {
        await postResetCode({
          email: email,
          resetCode: code,
        }).unwrap();

        setEmail("");
        setCode("");
        notify("تم التحقق بنجاح", "success");
        router.push("/reset-password");
      } catch (error) {
        if (isApiError(error)) {
          if (
            error?.data?.message?.includes(
              "Reset code expired. Please request a new one."
            )
          ) {
            notify("انتهت صلاحية الكود", "error");
          } else if (error?.data?.message?.includes("Invalid reset code.")) {
            notify("الكود غير صحيح", "error");
          } else {
            notify("حدث خطأ", "error");
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
  };
};

export default UseResetCode;
