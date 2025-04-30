"use client";
import Link from "next/link";
import {  ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
const AdminLinksOnSmallScreens: React.FC = () => {
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
  const pathname = usePathname();
  
  const buttons = [
    {index:0, label: "الطلبات", HREF: "/orders" },
    {index:1, label: "طلبات الصيانة", HREF: "/maintenance-requests" },
    {index:2, label: "بيانات العملاء", HREF: "/clients" },
    {index:3, label: "اضافه المنتج", HREF: "/addproduct" },
    {index:4, label: "تعديل المنتج", HREF: "/editproduct" },
    {index:5, label: "الفئه", HREF: "/category" },
    {index:6, label: "الماركة", HREF: "/brand" },
    {index:7, label: "تعديل التوصيل", HREF: "/delivery" },
    {id:8, label: "عميل جديد", HREF: "/customers" },

  ];
  return (
    <div className="flex-col  space-y-4 mt-3 hidden max-[950px]:block">
      <div className="flex items-center justify-center space-x-2  rounded bg-white border-b border-gray-200 p-2">
            <div className="flex-shrink-0 ">
              <div className="flex-shrink-0 w-9 h-9 rounded-full pb-1 bg-gray-600 flex items-center justify-center text-white font-bold text-lg">
                {FirstLetter}
              </div>
            </div>
            <div>
              <p className="font-bold">{NAME}</p>
              <p className="text-sm text-gray-500">{dateOnly}</p>
            </div>
          </div>
      {buttons.map((button) => {
        const fullPath = `/admin${button.HREF}`;
        const active = pathname === fullPath;
        return (
          <Link href={fullPath} key={button.index}>
            <RotatingButton
              label={button.label}
              active={active}
              onClick={() => {}}
            />
          </Link>
        );
      })}
      
    </div>
  );
};

export default AdminLinksOnSmallScreens;
