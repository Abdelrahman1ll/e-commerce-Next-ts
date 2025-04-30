"use client";
import UseAddProductComponents from "./Add-Product-Components";
// import Image from "next/image";
import AddProductUpload from "./AddProductUpload";

import { FC } from "react";

const AddProductComponents: FC = () => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    price,
    setPrice,
    PriceBeforeDiscount,
    setPriceBeforeDiscount,
    quantity,
    setQuantity,
    Brand,
    setBrand,
    category,
    setCategory,
    uploadKey,
    handleSubmit,
    errors,
    isLoading,
    categoriesArray,
    handleFiles,
    brandsArray,
  } = UseAddProductComponents();
  return (
    <div dir="rtl" className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">اضافة منتج جديد</h1>
      <form className="space-y-4">
        {/* صورة المنتج */}
        <div>
          <AddProductUpload onFilesChange={handleFiles} key={uploadKey} />
          {errors.image && (
            <div className="mb-2 text-sm text-red-500">{errors.image}</div>
          )}
        </div>
        {/* اسم المنتج */}
        <div>
          <label htmlFor="productName" className="block mb-1 ">
            اسم المنتج
          </label>
          <input
            type="text"
            id="productName"
            placeholder="ادخل اسم المنتج"
            required
            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
              ${errors.title ? "outline-red-500" : "outline-gray-300"}
              
              `}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          {errors.title && (
            <div className="mb-2 text-sm text-red-500">{errors.title}</div>
          )}
        </div>

        {/* تفاصيل المنتج */}
        <div>
          <label htmlFor="productDetails" className="block mb-1 ">
            تفاصيل المنتج
          </label>
          <textarea
            id="productDetails"
            placeholder="ادخل تفاصيل المنتج"
            rows={4}
            required
            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
              ${errors.description ? "outline-red-500" : "outline-gray-300"}


            `}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          {errors.description && (
            <div className="mb-2 text-sm text-red-500">
              {errors.description}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="productNumber" className="block mb-1 ">
            السعر قبل الخصم
          </label>
          <input
            type="number"
            id="productNumber"
            placeholder="ادخل سعر المنتج قبل الخصم"
            required
            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
              
              
              `}
            onChange={(e) => setPriceBeforeDiscount(e.target.value)}
            value={PriceBeforeDiscount}
          />
          {/* {errors.PriceBeforeDiscount && (
            <div className="mb-2 text-sm text-red-500">
              {errors.PriceBeforeDiscount}
            </div>
          )} */}
        </div>

        <div>
          <label htmlFor="productNumber" className="block mb-1 ">
            السعر بعد الخصم
          </label>
          <input
            type="number"
            id="productNumber"
            placeholder="ادخل سعر المنتج بعد الخصم"
            required
            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
              ${errors.price ? "outline-red-500" : "outline-gray-300"}

            `}
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
          {errors.price && (
            <div className="mb-2 text-sm text-red-500">{errors.price}</div>
          )}
        </div>

        <div>
          <label htmlFor="productNumber" className="block mb-1 ">
            كمية المنتج
          </label>
          <input
            type="number"
            id="productNumber"
            placeholder="ادخل كمية المنتج"
            required
            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
              ${errors.quantity ? "outline-red-500" : "outline-gray-300"}
              
              `}
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
          />
          {errors.quantity && (
            <div className="mb-2 text-sm text-red-500">{errors.quantity}</div>
          )}
        </div>

        {/* اختيار العنوان */}
        <div>
          <label htmlFor="address" className="block mb-1 ">
            اختيار الفئه
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            id="address"
            required
            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 cursor-pointer
              ${errors.category ? "outline-red-500" : "outline-gray-300"}
              
              `}
          >
            <option value="" disabled>
              اختر الفئه
            </option>
            {Array.isArray(categoriesArray) &&
              categoriesArray.map((address) => (
                <option key={address._id} value={address._id}>
                  {address.name}
                </option>
              ))}
          </select>
          {errors.category && (
            <div className="mb-2 text-sm text-red-500">{errors.category}</div>
          )}
        </div>

        <div>
          <label htmlFor="address" className="block mb-1 ">
            اختيار الماركة
          </label>
          <select
            onChange={(e) => setBrand(e.target.value)}
            value={Brand}
            id="address"
            required
            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 cursor-pointer
              ${errors.brand ? "outline-red-500" : "outline-gray-300"}
              
              `}
          >
            <option value="" disabled>
              اختر الماركة
            </option>
            {Array.isArray(brandsArray) &&
              brandsArray.map((address) => (
                <option key={address._id} value={address._id}>
                  {address.name}
                </option>
              ))}
          </select>
          {errors.brand && (
            <div className="mb-2 text-sm text-red-500">{errors.brand}</div>
          )}
        </div>

        {/* زر تقديم الطلب */}
        <div className="text-center">
          <button
            // disabled={isLoading}
            onClick={handleSubmit}
            type="submit"
            className="flex justify-center items-center bg-blue-700 w-full text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span>اضافة المنتج</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductComponents;
