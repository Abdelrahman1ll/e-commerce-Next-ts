"use client";
import { FC } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
interface FilterByPriceProps {
  toggleMenu: () => void;
  oPen: boolean;
}
const FilterByPrice: FC<FilterByPriceProps> = ({ toggleMenu, oPen }) => {

  let i = "";
  const handleFilter = (key: string) => {
    localStorage.setItem("sort", key);
  };

  if (localStorage.getItem("sort") === "السعر من الاقل الى الاعلى") {
    i = "السعر من الاقل الى الاعلى";
  } else if (localStorage.getItem("sort") === "السعر من الاعلى الى الاقل") {
    i = "السعر من الاعلى الى الاقل";
  } else {
    i = "";
  }
  return (
    <div className="relative inline-block text-left">
      {/* زر القائمة */}
      <button
        onClick={toggleMenu}
        className="inline-flex justify-between items-center w-full px-6 py-2 bg-gray-100 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none cursor-pointer"
      >
        الفلتر حسب السعر{" "}
        <ChevronDownIcon
          className={`ml-2 h-5 w-5 transition-transform duration-300 ${
            oPen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* القائمة المنسدلة */}
      {oPen && (
        <>
          {/* طبقة الغلاف (Overlay) تغطي كامل الصفحة وتستمع للنقرات لإغلاق القائمة */}
          <div onClick={toggleMenu} className="fixed inset-0 z-50" />
          <div className="absolute top-full w-full  origin-top-right bg-white border border-gray-200 rounded-md shadow-lg  ring-black ring-opacity-5 focus:outline-none cursor-pointer z-70 ">
            <div className="py-1">
              <div
                onClick={() => handleFilter("السعر من الاقل الى الاعلى")}
                className={`block px-4 py-2 text-sm text-gray-700 
                ${
                  i === "السعر من الاقل الى الاعلى"
                    ? "bg-blue-600 text-white"
                    : "text-black"
                }
                
                `}
              >
                السعر من الاقل الى الاعلى
              </div>
              <div
                onClick={() => handleFilter("السعر من الاعلى الى الاقل")}
                className={`block px-4 py-2 text-sm text-gray-700 
                ${
                  i === "السعر من الاعلى الى الاقل"
                    ? "bg-blue-600 text-white"
                    : "text-black"
                }
                
                `}
              >
                السعر من الاعلى الى الاقل
              </div>
              <div
                onClick={() => handleFilter("")}
                className={`text-center block px-4 py-2 text-sm text-gray-700 
                ${i === "" ? "bg-blue-600 text-white" : "text-black"}
                
                `}
              >
                بدون ترتيب
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterByPrice;
