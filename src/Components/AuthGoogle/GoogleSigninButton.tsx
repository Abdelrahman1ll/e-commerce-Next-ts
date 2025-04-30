"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { usePostGoogleMutation } from "../../redux/Auth/ApiAuth";

import notify from "../notify";
const GoogleSigninButton = () => {
  const { data: session } = useSession();
  const [postGoogle] = usePostGoogleMutation();
  const handleGoogleSignin = async () => {
    await signIn("google", { redirect: false, callbackUrl: "/logIn" });

    if (session) {
      const { email, name } = session.user || {};
      if (email || name) {
        try {
          const firstlastName = name?.split(" ")[1] || "";
          const firstName = name?.split(" ")[0] || "";
          await postGoogle({
            email: email || "",
            name: firstName || "",
            lastName: firstlastName || "",
          }).unwrap();
        } catch  {
         

          notify("خطاء في انشاء حساب ", "error");
        }
      } else {
        notify("خطاء في انشاء حساب", "error");
      }
    } else {
      notify("لم يتم انشاء حساب", "error");
    }
  };

  return (
    <button
      onClick={handleGoogleSignin}
      className="flex items-center justify-center w-full px-6 py-2 border border-gray-300 rounded-md shadow-md bg-white hover:bg-gray-100 transition cursor-pointer"
    >
      <span className="text-gray-700 font-medium">
           انشاء حساب بواسطة جوجل
      </span>
      <FcGoogle className="w-6 h-6 mr-2" />
    </button>
  );
};

export default GoogleSigninButton;
