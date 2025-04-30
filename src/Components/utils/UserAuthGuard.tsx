/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // التعديل هنا

const UserAuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get("authToken");
      const userData = Cookies.get("userData");

      // تحقق من أننا في بيئة العميل
      if (typeof window === "undefined") return;

      if (!token || !userData) {
        router.push("/logIn");
      } else {
        try {
          const parsedUserData = JSON.parse(userData);
          if (parsedUserData.role !== "user") {
            router.push("/");
          } else {
            setIsLoading(false);
          }
        } catch (error: unknown) {
          router.push("/logIn");
        }
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default UserAuthGuard;
