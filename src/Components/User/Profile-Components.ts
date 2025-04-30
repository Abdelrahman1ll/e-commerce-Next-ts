"use client";
import { useState, useEffect } from "react";
import {
  usePutForgotPasswordMutation,
  usePutUserMutation,
} from "@/redux/User/ApiUser";
import notify from "../notify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
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
const UseProfileComponents = () => {
  const router = useRouter();

  const [user, setUser] = useState<{
    _id?: string;
    name?: string;
    lastName?: string;
    email?: string;
    number?: string;
    updatedAt?: string;
  } | null>(null);
  const [name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [ToNumber, setToNumber] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordCurrent, setPasswordCurrent] = useState("");
  useEffect(() => {
    try {
      const storedUser = Cookies.get("userData") || "";
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === "object") {
          setUser(parsedUser);
          setName(parsedUser.name || "");
          setLastName(parsedUser.lastName || "");
          setEmail(parsedUser.email || "");
          setToNumber(parsedUser.number || "");
        }
      }
    } catch  {
      
      Cookies.remove("userData")
    }
  }, []);
  const [Number, setNumber] = useState("");
  const [open, setOpen] = useState(true);
  const [errors, setErrors] = useState({
    number: "",
    name: "",
    LastName: "",
    email: "",
    Tonumber: "",
    passwordnew: "",
    passwordcurrent: "",
  });
  const [putUser] = usePutUserMutation();
  const NAME = user?.name || "";
  const lastName = user?.lastName || "";
  const FirstLetter = NAME.trim().charAt(0).toUpperCase();
  const Email = user?.email || "";
  const phoneValue = user?.number || "";
  const Phone = /[a-zA-Z]/.test(phoneValue) ? "" : phoneValue;
  const updatedAt = user?.updatedAt || "";
  let dateOnly;
  if (updatedAt) {
    const isoString = updatedAt;
    const dateObject = new Date(isoString);
    dateOnly = dateObject.toISOString().split("T")[0];
  }

  const [Editopen, setEditopen] = useState(false);
  const handlePhone = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { ...errors };
    if (!Number.trim()) {
      newErrors.number = "رقم الهاتف مطلوب";
      valid = false;
    } else if (!/^\d{11}$/.test(Number)) {
      newErrors.number = "رقم الهاتف غير صالح";
    } else {
      newErrors.number = "";
    }
    setErrors(newErrors);

    const user = JSON.parse(Cookies.get("userData") || "");
    const userid = user._id;
    if (valid) {
      try {
        const resnum = await putUser({
          id: userid,
         data:{number: Number }
        }).unwrap();
        if (resnum) {
          setNumber("");
          setOpen(false);
          Cookies.remove("userData");
          Cookies.set("userData", JSON.stringify(resnum.user), {
            expires: 30, 
            path: "/",
          });
          window.location.reload();
        }
      } catch (error) {
        notify("حدث خطا ما", "error");
         if (error.data?.message?.includes("Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: test.users index: number_1 dup key: { number: \"01065217000\" }")) {
      setErrors({ ...errors, number: "رقم الهاتف  غير صالح" });
    } else {
      // Handle other errors
      setErrors({ ...errors, number: "حدث خطأ أثناء التحديث" });
    }
      }
    }
  };

  const validateProfile = () => {
    const newErrors = { ...errors };
    let valid = true;

    // Validate Name
    if (!name.trim()) {
      newErrors.name = "الاسم الأول مطلوب";
      valid = false;
    } else if (name.length < 3) {
      newErrors.name = "الاسم غير صالح";
      valid = false;
    } else {
      newErrors.name = "";
    }

    // Validate Last Name
    if (!LastName.trim()) {
      newErrors.LastName = "الاسم الثاني مطلوب";
      valid = false;
    } else {
      newErrors.LastName = "";
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
    if (!ToNumber.trim()) {
      newErrors.Tonumber = "رقم الهاتف مطلوب";
      valid = false;
    } else if (!/^\d{11}$/.test(ToNumber)) {
      newErrors.Tonumber = "رقم الهاتف غير صالح";
      valid = false;
    } else {
      newErrors.number = "";
    }

    setErrors(newErrors);

    return valid;
  };
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateProfile()) {
      return;
    }
    const user = JSON.parse(Cookies.get("userData") || "");
    const userid = user._id;

    try {
      const res = await putUser({
        id: userid,
        data: {
          name: name,
          lastName: LastName,
          email: email,
          number: ToNumber,
        },
      }).unwrap();
      if (res.user) {
        
        setName("");
        setLastName("");
        setEmail("");
        setToNumber("");
        setEditopen(false);
        Cookies.remove("userData");
          Cookies.set("userData", JSON.stringify(res.user), {
            expires: 30, 
            path: "/",
          });
          window.location.reload();
      }
    } catch (error) {
      notify("حدث خطا ما", "error");
      if (error.data?.message === "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: test.users index: number_1 dup key: { number: \"01065217980\" }") {
        setErrors({ ...errors, Tonumber: "رقم الهاتف  غير صالح" });
      } else {
        // Handle other errors
        setErrors({ ...errors, Tonumber: "حدث خطاء اثناء التحديث" });
      }
    }
  };
  const [putForgotPassword] = usePutForgotPasswordMutation();
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { ...errors };
    let valid = true;

    if (!passwordCurrent.trim()) {
      newErrors.passwordcurrent = "كلمة المرور مطلوبة";
      valid = false;
    } else if (passwordCurrent.length < 6) {
      newErrors.passwordcurrent = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
      valid = false;
    } else {
      newErrors.passwordcurrent = "";
    }

    if (!passwordNew) {
      newErrors.passwordnew = "تاكيد كلمة المرور مطلوب";
      valid = false;
    } else if (passwordNew.length < 6) {
      newErrors.passwordnew = "كلمة المرور يجب ان تكون 6 احرف على الاقل";
      valid = false;
    } else {
      newErrors.passwordnew = "";
    }

    if (passwordCurrent === passwordNew) {
      newErrors.passwordnew = "كلمة المرور يجب ان تكون مختلفة";
      valid = false;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(passwordNew)) {
      newErrors.passwordnew = "يجب ان تكون كلمة المرور احرف وارقام";
      valid = false;
    } else {
      newErrors.passwordnew = "";
    }
    setErrors(newErrors);
    if (valid) {
      try {
        const userId = Cookies.get("userData") || "";
        const Id = JSON.parse(userId || "")._id;
        await putForgotPassword({
          id: Id,
          data: { passwordCurrent, passwordNew },
        }).unwrap();
        setPasswordCurrent("");
        setPasswordNew("");
        notify("تم تغيير كلمة المرور بنجاح", "success");
        Cookies.remove("userData");
        Cookies.remove("authToken");
        router.push("/logIn");
      } catch (error) {
       
        setErrors((prevErrors) => ({
          ...prevErrors,
          passwordcurrent: "",
          passwordnew: "",
        }));
        if (isApiError(error)) {
          if (error.data?.message?.includes("لا يمكن تغيير كلمة المرور")) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              passwordcurrent: "لا يمكن تغيير كلمة المرور",
            }));
          } else if (
            error.data?.message?.includes("كلمة المرور القديمة غير صحيحة")
          ) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              passwordcurrent: "كلمة المرور القديمة غير صحيحة",
            }));
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
    NAME,
    name,
    setName,
    setLastName,
    email,
    setEmail,
    ToNumber,
    setToNumber,
    handleEdit,
    Editopen,
    setEditopen,
    handlePhone,
    Number,
    setNumber,
    errors,
    open,
    setOpen,
    lastName,
    FirstLetter,
    Email,
    Phone,
    dateOnly,
    phoneValue,
    LastName,
    handleChangePassword,
    passwordNew,
    setPasswordNew,
    passwordCurrent,
    setPasswordCurrent,
  };
};

export default UseProfileComponents;
