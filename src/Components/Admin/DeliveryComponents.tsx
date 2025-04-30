"use client";

import {
  useGetDeliveryAndtaxQuery,
  usePostDeliveryAndtaxMutation,
} from "@/redux/Admin/ApiProduct";
import { useState } from "react";
import notify from "../notify";

const DeliveryComponents = () => {
  const [postDeliveryAndtax] = usePostDeliveryAndtaxMutation();
  const { data: delivery, refetch } = useGetDeliveryAndtaxQuery({});
  const deliveryData = delivery?.data || [];
  const [Delivery, setDelivery] = useState("");
  const [errors, setErrors] = useState({
    delivery: "",
  });

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { ...errors };

    // Validate Delivery
    if (!Delivery) {
      newErrors.delivery = "ادخل التوصيل";
      valid = false;
    } else {
      newErrors.delivery = "";
    }

    setErrors(newErrors);

    if (valid) {
      try {
        await postDeliveryAndtax({ deliveryPrice: Delivery }).unwrap();
        refetch();
        setDelivery("");
      } catch  {
        notify("حدث خطا ما", "error");
      }
    }
  };

  return (
    <div dir="rtl" className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">تعديل التوصيل</h1>

      <div className="flex justify-center">
        <div className="mb-8 w-full ml-2">
          <label htmlFor="productName" className="block mb-1 ">
            تعديل التوصيل
          </label>
          <input
            type="number"
            id="productName"
            placeholder="ادخل التوصيل"
            required
            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 
            ${errors.delivery ? "outline-red-500" : "outline-gray-300"}
  
  `}
            value={Delivery}
            onChange={(e) => setDelivery(e.target.value)}
          />
          {errors.delivery && (
            <div className="mb-2 text-sm text-red-500">{errors.delivery}</div>
          )}
        </div>
        <div className="mt-7">
          <button
            type="submit"
            onClick={handlePost}
            className="inline-flex w-full  justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3  cursor-pointer"
          >
            اضافة
          </button>
        </div>
      </div>
      <div
        dir="rtl"
        className="p-2  mb-4  text-center bg-white shadow-md rounded-md border border-gray-200 "
      >
        <div className="flex  items-center justify-center ">
          <p className="font-bold ml-2">سعر التوصيل </p>
          <p className="font-bold text-blue-600">
            ({deliveryData.deliveryPrice})
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryComponents;
