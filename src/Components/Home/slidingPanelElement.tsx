"use client";
import {
  useGetBrandQuery,
  useGetCategoryQuery,
} from "@/redux/Admin/ApiCategoryBrand";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, FC } from "react";

interface Category {
  _id: string;
  name: string;
}

const SlidingPanelElement: FC = () => {
  const { data: categories } = useGetCategoryQuery({});
  const { data: brands } = useGetBrandQuery({});
  const categoriesArray = categories?.data || [];
  const brandsArray = brands?.data || [];

  const [Open, setOpen] = useState(false);
  const [Classification, setClassification] = useState(false);
  const [TheCompany, setTheCompany] = useState(false);

  // استخدام lazy initializer لتحميل القيم من localStorage إن وجدت
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    () => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("selectedCategoryIds");
        return stored ? JSON.parse(stored) : [];
      }
      return [];
    }
  );

  const [selectedBrandIds, setSelectedBrandIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("selectedBrandIds");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  // قيم السعر
  const [min, setMin] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("min");
      return stored ? Number(stored) : 0;
    }
    return 0;
  });
  const [max, setMax] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("max");
      return stored ? Number(stored) : 0;
    }
    return 0;
  });
  // نصوص قيم الإدخال للسعر
  const [gte, setGte] = useState<string>(() =>
    typeof window !== "undefined" ? localStorage.getItem("min") || "" : ""
  );
  const [lte, setLte] = useState<string>(() =>
    typeof window !== "undefined" ? localStorage.getItem("max") || "" : ""
  );

  // حفظ القيم في localStorage عند تغيرها
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "selectedCategoryIds",
        JSON.stringify(selectedCategoryIds)
      );
    }
  }, [selectedCategoryIds]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "selectedBrandIds",
        JSON.stringify(selectedBrandIds)
      );
    }
  }, [selectedBrandIds]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("min", min.toString());
      localStorage.setItem("max", max.toString());
    }
  }, [min, max]);

  // دوال التعامل مع حقول السعر
  const maxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMax(Number(value));
    setLte(value);
    if (typeof window !== "undefined") {
      localStorage.setItem("max", value);
    }
  };

  const minPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMin(Number(value));
    setGte(value);
    if (typeof window !== "undefined") {
      localStorage.setItem("min", value);
    }
  };

  return (
    <>
      {/* قسم السعر */}
      <div className="mt-5 border-b border-b-gray-400">
        <button
          onClick={() => setOpen(!Open)}
          className="flex items-center justify-between w-full px-4 py-2 text-left focus:outline-none cursor-pointer"
        >
          <ChevronDownIcon
            className={`h-5 w-5 transform transition-transform duration-700 ${
              Open ? "rotate-180" : "rotate-0"
            }`}
          />
          <div className="text-lg font-semibold">سعر</div>
        </button>
        <div
          className={`overflow-hidden px-4 py-2 transition duration-1000 transform ${
            Open ? "translate-y-0 block" : "translate-y-5 hidden"
          }`}
        >
          <div className="p-4 flex justify-center">
            <div>
              <input
                id="highestPrice"
                type="number"
                onChange={maxPrice}
                value={lte}
                autoComplete="off"
                placeholder="الى"
                className="mr-2 font-bold p-2 w-20 rounded-md shadow-sm border-2 sm:text-sm focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
              />
            </div>
            <div className="text-4xl mb-1">-</div>
            <div>
              <input
                id="lowestPrice"
                type="number"
                onChange={minPrice}
                value={gte}
                autoComplete="off"
                placeholder="من"
                className="ml-2 font-bold p-2 w-20 rounded-md shadow-sm border-2 sm:text-sm focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
              />
            </div>
          </div>
          {/* حقل السعر سيحتفظ بالقيمة من localStorage حتى بعد Refresh */}
        </div>
      </div>

      {/* قسم الفئة */}
      <div className="mt-5 border-b border-b-gray-400">
        <button
          onClick={() => setClassification(!Classification)}
          className="flex items-center justify-between w-full px-4 py-2 text-left focus:outline-none cursor-pointer"
        >
          <ChevronDownIcon
            className={`h-5 w-5 transform transition-transform duration-700 ${
              Classification ? "rotate-180" : "rotate-0"
            }`}
          />
          <div className="text-lg font-semibold">فئة</div>
        </button>
        <div
          className={`overflow-hidden px-4 py-2 transition duration-1000 transform ${
            Classification ? "translate-y-0 block" : "translate-y-5 hidden"
          }`}
        >
          {categoriesArray &&
            categoriesArray.map((category: Category) => {
              // تنظيف الـ ID إذا كانت هناك علامات غير مرغوب بها
              const cleanId = category._id.replace(/[[\]']+/g, "");
              return (
                <div
                  key={cleanId}
                  onClick={() =>
                    setSelectedCategoryIds((prevSelected: string[]) =>
                      prevSelected.includes(cleanId)
                        ? prevSelected.filter((id) => id !== cleanId)
                        : [...prevSelected, cleanId]
                    )
                  }
                  className="flex items-center justify-end space-x-2 mb-6 cursor-pointer"
                >
                  <span className="text-lg font-medium">{category.name}</span>
                  <div
                    className={`w-6 h-6 border rounded-full flex items-center justify-center transition-colors duration-200 ${
                      selectedCategoryIds.includes(cleanId)
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {selectedCategoryIds.includes(cleanId) && (
                      <CheckIcon className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* قسم المركة */}
      <div className="mt-5 mb-6 border-b border-b-gray-400">
        <button
          onClick={() => setTheCompany(!TheCompany)}
          className="flex items-center justify-between w-full px-4 py-2 text-left focus:outline-none cursor-pointer"
        >
          <ChevronDownIcon
            className={`h-5 w-5 transform transition-transform duration-700 ${
              TheCompany ? "rotate-180" : "rotate-0"
            }`}
          />
          <div className="text-lg font-semibold">المركة</div>
        </button>
        <div
          className={`overflow-hidden px-4 py-2 transition duration-1000 transform ${
            TheCompany ? "translate-y-0 block" : "translate-y-5 hidden"
          }`}
        >
          {brandsArray &&
            brandsArray.map((brand: Category) => {
              const cleanId = brand._id.replace(/[[\]']+/g, "");
              return (
                <div
                  key={cleanId}
                  onClick={() =>
                    setSelectedBrandIds((prevSelected: string[]) =>
                      prevSelected.includes(cleanId)
                        ? prevSelected.filter((id) => id !== cleanId)
                        : [...prevSelected, cleanId]
                    )
                  }
                  className="flex items-center justify-end space-x-2 mb-6 cursor-pointer"
                >
                  <span className="text-lg font-medium">{brand.name}</span>
                  <div
                    className={`w-6 h-6 border rounded-full flex items-center justify-center transition-colors duration-200 ${
                      selectedBrandIds.includes(cleanId)
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {selectedBrandIds.includes(cleanId) && (
                      <CheckIcon className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SlidingPanelElement;
