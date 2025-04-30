"use client";
import { LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
const RotatingButton: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => {
  return (
    <div className="flex flex-col space-y-4 mt-4">
      <div
        onClick={onClick}
        className={`flex items-center font-bold justify-between p-3 cursor-pointer rounded-md transition duration-300 transform ${
          active
            ? "bg-gray-100 text-blue-500"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        <ChevronRight
          className={`h-5 w-5 mr-2 transition duration-300 ${
            active ? "rotate-90" : "rotate-0"
          }`}
        />
        <div>{label}</div>
      </div>
    </div>
  );
};
const UserLinks = () => {

  const [user, setUser] = useState<{
    name?: string;
    updatedAt?: string;
  } | null>(null);
  
    useEffect(() => {
      if (Cookies.get("userData") != null) {
        setUser(JSON.parse(Cookies.get("userData") || ""));
      }
    }, []);
  
    const NAME = user?.name || "";
    const FirstLetter = NAME.trim().charAt(0).toUpperCase();
    const updatedAt = user?.updatedAt || "";
  let dateOnly;
  if (updatedAt) {
    const isoString = updatedAt;
    const dateObject = new Date(isoString);
    dateOnly = dateObject.toISOString().split("T")[0];
  }
    const ClickLogout = (e: React.FormEvent) => {
      e.preventDefault();
      Cookies.remove("userData");
      Cookies.remove("authToken");
      window.location.href = "/";

      
    }
    
  const pathname = usePathname();
  const buttons = [
    {id:0, label: "الحساب الشخصي", HREF: "/profile" },
    {id:1, label: "اضافه العنوان", HREF: "/address" },
    {id:2, label: "الطلبات", HREF: "/order" },
    {id:3, label: "طلبات الصيانة", HREF: "/maintenance-requests" },
  ];
  return (
    <>
      {/* للعرض في الشاشات الأكبر */}
      <div className="hidden min-[950px]:block">
        <div className="w-64 border-l border-gray-200 bg-white p-4 rounded shadow-lg">
          <div className="flex items-center space-x-4 border-b border-gray-200 pb-4">
            <div className="flex-shrink-0">
              <div className="flex-shrink-0 w-9 h-9 rounded-full pb-1 bg-gray-600 flex items-center justify-center text-white font-bold text-lg">
                {FirstLetter}
              </div>
            </div>
            <div>
              <p className="font-bold">{NAME}</p>
              <p className="text-sm text-gray-500">تاريخ التسجيل: {dateOnly}</p>
            </div>
          </div>
          {/* روابط التنقل */}
          <nav className="flex flex-col  text-md font-semibold ">
            {buttons.map((button) => {
              const fullPath = `/user${button.HREF}`;
              const active = pathname === fullPath;
              return (
                <Link href={fullPath} key={button.id}>
                  <RotatingButton
                    label={button.label}
                    active={active}
                    onClick={() => {}}
                  />
                </Link>
              );
            })}
            <div onClick={ClickLogout} className="flex text-red-500 items-center justify-center cursor-pointer bg-white p-4 hover:bg-gray-100 rounded-md">
              <LogOut className="h-5 w-5 mr-1" />
              <span>تسجيل الخروج</span>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default UserLinks;
