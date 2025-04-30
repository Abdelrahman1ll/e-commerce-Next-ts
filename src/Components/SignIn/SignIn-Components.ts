"use client";
import { usePostSignupMutation } from "../../redux/Auth/ApiAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";

import notify from "../notify";

const UseSignInComponents = () => {
  const [postSignup, { isLoading, isSuccess }] = usePostSignupMutation();
  const router = useRouter();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  // State variables for validation errors
  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    email: "",
    number: "",
    password: "",
    passwordConfirmation: "",
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

    // Validate Name
    if (!name.trim()) {
      newErrors.name = "الاسم الأول مطلوب";
      valid = false;
    } else if (name.length < 3) {
      newErrors.name = "الاسم غير صالح";
    } else {
      newErrors.name = "";
    }

    // Validate Last Name
    if (!lastName.trim()) {
      newErrors.lastName = "الاسم الثاني مطلوب";
      valid = false;
    } else {
      newErrors.lastName = "";
    }

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

    // Validate Number
    if (!number.trim()) {
      newErrors.number = "رقم الهاتف مطلوب";
      valid = false;
    } else if (!/^\d{11}$/.test(number)) {
      newErrors.number = "رقم الهاتف غير صالح";
    } else {
      newErrors.number = "";
    }

    // Validate Password
    if (!password) {
      newErrors.password = "كلمة المرور مطلوبة";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
      valid = false;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
      newErrors.password = "كلمة المرور يجب ان تحتوي على حرف ورقم";
      valid = false;
    } else {
      newErrors.password = "";
    }

    // Validate Password Confirmation
    if (!passwordConfirmation) {
      newErrors.passwordConfirmation = "تاكيد كلمة المرور مطلوب";
      valid = false;
    } else if (passwordConfirmation !== password) {
      newErrors.passwordConfirmation = "كلمتا المرور غير متطابقة";
      valid = false;
    } else {
      newErrors.passwordConfirmation = "";
    }

    setErrors(newErrors);

    if (valid) {
      try {
        await postSignup({
          name,
          lastName,
          email,
          number,
          password,
          passwordConfirm: passwordConfirmation,
        }).unwrap();

        setName("");
        setLastName("");
        setEmail("");
        setNumber("");
        setPassword("");
        setPasswordConfirmation("");
        if (isSuccess) {
          notify("تم انشاء الحساب بنجاح", "success");
        }
        router.push("/logIn");
      } catch (error: unknown) {
        setErrors((prev) => ({
          ...prev,
          email: "",
          number: "",
        }));
        if (isApiError(error)) {
          // Check for validation error (400 status)

          // Existing user check
          if (
            error.data?.message?.includes(
              "The number or email is already registered."
            )
          ) {
            setErrors((prev) => ({
              ...prev,
              email: "رقم الهاتف او البريد الالكتروني تم التسجيل به من قبل",
              number: "رقم الهاتف او البريد الالكتروني تم التسجيل به من قبل",
            }));
          } else if (
            error.data?.message ===
            "كلمة المرور يجب أن تحتوي على الأقل على 6 أحرف وحرف ورقم"
          ) {
            notify(
              "كلمة المرور يجب أن تحتوي على الأقل على 6 أحرف ورقم",
              "error"
            );
          } else if (error.data?.message) {
            notify("حدث خطأ غير متوقع", "error");
           
          }
        } else {
          notify("حدث خطأ غير معروف", "error");
          
        }
      }
    }
  };
  // دالة مساعدة للتحقق من نوع الخطأ
  function isApiError(error: unknown): error is ApiError {
    return typeof error === "object" && error !== null && "data" in error;
  }

  return {
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
  };
};

export default UseSignInComponents;
