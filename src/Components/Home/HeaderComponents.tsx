"use client";
import { useState, useEffect } from "react";
import SlidingPanel from "./SlidingPanel";
import {
  User,
  Wrench,
  ShoppingCart,
  UserRoundCog,
  Funnel,
  House,
} from "lucide-react";
import Link from "next/link";
import UseCartComponents from "../Cart/Cart-Components";
import Cookies from "js-cookie";
const HeaderComponents: React.FC<{ user: string; setUser: string }> = () => {
  const { Amount } = UseCartComponents();

  const [user, setUser] = useState<{
    name?: string;
    role?: string;
  } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    if (Cookies.get("userData") != null && Cookies.get("userData") != undefined) {
      setUser(JSON.parse(Cookies.get("userData") || ""));
    }
  }, []);

  

  const NAME = user?.name || "";
  const Admin = user?.role === "admin";
  const FirstLetter = NAME.trim().charAt(0).toUpperCase();
  return (
    <>
      {/* الشريط العلوي عند التصفحة الكبير */}
      <nav className=" fixed top-0 left-0 w-full bg-white shadow-md z-50 hidden min-[950px]:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-6">
              {user ? (
                <Link href={`${Admin ? "/admin/orders" : "/user/profile"}`}>
                  <div className="flex items-center">
                    <p className="font-bold mr-2 text-gray-700 hover:text-blue-600">
                      {NAME}
                    </p>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full pb-1 bg-gray-600 flex items-center justify-center text-white font-bold text-lg">
                      {FirstLetter}
                    </div>
                  </div>
                </Link>
              ) : (
                <Link href="/logIn">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-bold cursor-pointer">
                    <User />
                    <span>تسجيل الدخول</span>
                  </button>
                </Link>
              )}

              <Link href="/cart">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-bold cursor-pointer">
                  <div className="relative">
                    <ShoppingCart size={24} />

                    <span className={`absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white
                       
                      
                      `}>
                      {Amount}
                    </span>
                  </div>

                  <span>عربة التسوق</span>
                </button>
              </Link>
            </div>
            <div className=" md:flex space-x-8 font-bold ">
              <Link href="/">
                <div className=" text-gray-700 hover:text-blue-600 cursor-pointer">
                  الرئيسية
                </div>
              </Link>
              <Link href="/contactUs">
                <div className="text-gray-700 hover:text-blue-600 cursor-pointer">
                  اتصل بنا
                </div>
              </Link>
              <Link href="/maintenance">
                <button className="text-gray-700 hover:text-blue-600 flex items-center gap-1 cursor-pointer">
                  خدمة الصيانة
                  <Wrench />
                </button>
              </Link>
            </div>

            <div className="group cursor-pointer">
              {/* الكود الذي يظهر عندما لا يكون الماوس فوق العنصر */}

              <div className="block group-hover:hidden">
                <span className="text-3xl font-bold text-blue-600">
                  HeaterPro
                </span>
              </div>

              {/* الكود الذي يظهر عند مرور الماوس على العنصر */}
              <Link href="/">
                <div className="hidden group-hover:block">
                  <span className="flex text-3xl font-bold text-blue-600">
                    H
                    <div className="text-black">
                      <UserRoundCog size={24} />
                    </div>
                    eaterPro
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* الشريط العلوي عند التصفحة المصغرة */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 hidden max-[950px]:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 items-center h-16">
            {/* العنصر على اليسار */}
            <Link href="/contactUs">
              <div className="flex justify-start">
                <div className="font-bold text-gray-700 hover:text-blue-600 cursor-pointer">
                  اتصل بنا
                </div>
              </div>
            </Link>
            {/* العنصر في الوسط */}
            <div className="flex justify-center">
              <div className="group cursor-pointer">
                {/* الكود الذي يظهر عندما لا يكون الماوس فوق العنصر */}
                <Link href="/">
                  <div className="block group-hover:hidden">
                    <span className="text-3xl font-bold text-blue-600">
                      HeaterPro
                    </span>
                  </div>
                </Link>
                {/* الكود الذي يظهر عند مرور الماوس على العنصر */}
                <Link href="/">
                  <div className="hidden group-hover:block">
                    <span className="flex text-3xl font-bold text-blue-600">
                      H
                      <div className="text-black">
                        <UserRoundCog size={24} />
                      </div>
                      eaterPro
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            {/* العنصر على اليمين */}
            <Link href="/maintenance">
              <div className="flex justify-end">
                <button className="font-bold text-gray-700 hover:text-blue-600 flex items-center mr-5 cursor-pointer">
                  <Wrench size={30} />
                </button>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* الشريط السفلي عند التصفحة المصغرة */}
      <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md z-50 hidden max-[950px]:block">
        <div className="max-w-7xl mx-auto px-3">
          <div className="flex justify-around items-center h-16">
            {user ? (
              <Link href={`${Admin ? "/admin/links-admin" : `/user/links-user`}`}>
                <button className="flex flex-col items-center text-gray-700 hover:text-blue-600 font-bold cursor-pointer">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full  bg-gray-600 flex items-center justify-center text-white ">
                    {FirstLetter}
                  </div>
                  <div className="font-bold mr-2 hover:text-blue-600">
                    {NAME}
                  </div>
                </button>
              </Link>
            ) : (
              <Link href="/logIn">
                <button className="flex flex-col items-center space-y-1 text-gray-700 hover:text-blue-600 font-bold cursor-pointer">
                  <User size={24} />
                  <span className="text-sm">تسجيل الدخول</span>
                </button>
              </Link>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col items-center space-y-1 text-gray-700 hover:text-blue-600 font-bold cursor-pointer"
            >
              <Funnel size={24} />
              <SlidingPanel
                open={isOpen}
                togglePanel={() => setIsOpen(false)}
              />
              <span className="text-sm">فلتر</span>
            </button>
            <Link href="/cart">
              <button className="flex flex-col items-center space-y-1 text-gray-700 hover:text-blue-600 font-bold cursor-pointer">
                <div className="relative">
                  <ShoppingCart size={24} />

                  <span className={`absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white
                    `}>
                    {Amount}
                  </span>
                </div>
                <span className="text-sm">عربة التسوق</span>
              </button>
            </Link>
            <Link href="/">
              <button className="flex flex-col items-center space-y-1 text-gray-700 hover:text-blue-600 font-bold cursor-pointer">
                <House size={24} />
                <span className="text-sm">الرئيسية</span>
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HeaderComponents;
