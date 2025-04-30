"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import UseAllProductsComponents from "./All-Products-Components";
import AddProductUploadEdit from "./AddProductUploadEdit";
import { useState } from "react";

// Product type definition
type ProductTy = {
  _id: string;
  title: string;
  price: string;
  PriceBeforeDiscount?: string;
  image: string;
  images?: string[];
  averageRating?: number;
  quantity: number;
  description: string;
  Category: string;
  brand: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
};

const AddProducts = () => {
  const {
    handleEditId,
    handleUpdate,
    editOpen,
    title,
    description,
    price,
    quantity,
    brand,
    category,
    errors,
    isLoading,
    brandsArray,
    categoriesArray,
    setEditOpen,
    setTitle,
    setDescription,
    setPriceBeforeDiscount,
    priceBeforeDiscount,
    setPrice,
    setQuantity,
    setCategory,
    setBrand,
    products,
    handleFiles,
    uploadKey,
    images,
    isPutLoading,
  } = UseAllProductsComponents();
  const [imgLoading, setImgLoading] = useState(true);
  return (
    <>
      {/* Edit Product Dialog */}
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto rounded-2xl mt-20 max-[950px]:mb-20">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden w-full h-full bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg max-h-[calc(100vh-100px)] overflow-y-auto"
            >
              <div className="bg-white px-4 pt-2 pb-4 sm:p-6 sm:pb-2">
                <div className="flex justify-center">
                  <DialogTitle
                    as="h3"
                    className="text-center text-base font-semibold text-gray-900 pb-4"
                  >
                    تعديل المنتج
                  </DialogTitle>
                </div>

                <form dir="rtl" className="space-y-4 text-right">
                  {/* Product Images */}
                  <AddProductUploadEdit
                    key={uploadKey}
                    initialImages={images}
                    onFilesChange={handleFiles}
                  />
                  {/* Product Name */}
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
                      <div className="mt-1 text-sm text-red-500">
                        {errors.title}
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
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
                        ${
                          errors.description
                            ? "outline-red-500"
                            : "outline-gray-300"
                        }
                      `}
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                    {errors.description && (
                      <div className="mt-1 text-sm text-red-500">
                        {errors.description}
                      </div>
                    )}
                  </div>

                  {/* Original Price (Before Discount) */}
                  <div>
                    <label
                      htmlFor="priceBeforeDiscount"
                      className="block mb-1 "
                    >
                      السعر قبل الخصم
                    </label>
                    <input
                      type="number"
                      id="priceBeforeDiscount"
                      placeholder="ادخل سعر المنتج قبل الخصم"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                      onChange={(e) => setPriceBeforeDiscount(e.target.value)}
                      value={priceBeforeDiscount}
                    />
                  </div>

                  {/* Price (After Discount) */}
                  <div>
                    <label htmlFor="price" className="block mb-1 ">
                      السعر بعد الخصم
                    </label>
                    <input
                      type="number"
                      id="price"
                      placeholder="ادخل سعر المنتج بعد الخصم"
                      required
                      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
                        ${errors.price ? "outline-red-500" : "outline-gray-300"}
                      `}
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                    />
                    {errors.price && (
                      <div className="mt-1 text-sm text-red-500">
                        {errors.price}
                      </div>
                    )}
                  </div>

                  {/* Quantity */}
                  <div>
                    <label htmlFor="quantity" className="block mb-1 ">
                      كمية المنتج
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      placeholder="ادخل كمية المنتج"
                      required
                      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
                        ${
                          errors.quantity
                            ? "outline-red-500"
                            : "outline-gray-300"
                        }
                      `}
                      onChange={(e) => setQuantity(e.target.value)}
                      value={quantity}
                    />
                    {errors.quantity && (
                      <div className="mt-1 text-sm text-red-500">
                        {errors.quantity}
                      </div>
                    )}
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label htmlFor="category" className="block mb-1 ">
                      اختيار الفئة
                    </label>
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      value={category}
                      id="category"
                      required
                      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 cursor-pointer
                        ${
                          errors.category
                            ? "outline-red-500"
                            : "outline-gray-300"
                        }
                      `}
                    >
                      <option value="" disabled>
                        اختر الفئة
                      </option>
                      {Array.isArray(categoriesArray) &&
                        categoriesArray.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                    </select>
                    {errors.category && (
                      <div className="mt-1 text-sm text-red-500">
                        {errors.category}
                      </div>
                    )}
                  </div>

                  {/* Brand Selection */}
                  <div>
                    <label htmlFor="brand" className="block mb-1 ">
                      اختيار الماركة
                    </label>
                    <select
                      onChange={(e) => setBrand(e.target.value)}
                      value={brand}
                      id="brand"
                      required
                      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 cursor-pointer
                        ${errors.brand ? "outline-red-500" : "outline-gray-300"}
                      `}
                    >
                      <option value="" disabled>
                        اختر الماركة
                      </option>
                      {Array.isArray(brandsArray) &&
                        brandsArray.map((brandItem) => (
                          <option key={brandItem._id} value={brandItem._id}>
                            {brandItem.name}
                          </option>
                        ))}
                    </select>
                    {errors.brand && (
                      <div className="mt-1 text-sm text-red-500">
                        {errors.brand}
                      </div>
                    )}
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <div className="text-center min-[640px]:ml-4">
                  <button
                    onClick={handleUpdate}
                    type="submit"
                    className="flex justify-center items-center bg-blue-700 w-full text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span>
                      {isPutLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <span>تعديل المنتج</span>
                      )}
                    </span>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* Products Grid */}
      <div className="w-full container mx-auto px-4">
        <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {isLoading ? (
            // Loading skeletons
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-80 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))
          ) : products.length !== 0 ? (
            // Product list
            products.map((product: ProductTy) => (
              <div key={product._id}>
                <div className="w-full mb-2 ">
                  <button
                    onClick={() => handleEditId(product._id)}
                    className="text-sm bg-white border border-blue-500 text-blue-500  p-1 w-full py-1 rounded hover:bg-gray-200 cursor-pointer"
                  >
                    تعديل
                  </button>
                </div>

                <div className="group relative">
                  <Link
                    href={`/product/${product?._id}`}
                    className="absolute inset-0 z-20"
                  />

                  <div key={product._id} className="relative">
                    {imgLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <Image
                      src={product?.image}
                      alt="productMainImage"
                      width={320}
                      height={320}
                      className={`aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75
                              ${
                                product?.quantity === 0
                                  ? "opacity-50"
                                  : "transition duration-300 ease-in-out transform hover:scale-105"
                              }
                              `}
                      onLoadingComplete={() => setImgLoading(false)}
                    />

                    {/* الدائرة عند نفاد الكمية */}
                    {product?.quantity === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-6">
                        <div className="rounded-full p-4 bg-white">
                          <p className="text-black font-bold text-lg text-center">
                            غير متوفر
                            <br />
                            <span className="text-sm">سيتم التزويد قريبًا</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-2 flex justify-between items-start flex-nowrap">
                    <p className="text-lg font-light text-blue-600 shrink-0">
                      EGP-{Number(product?.price || 0).toLocaleString("en-US")}
                    </p>

                    <div dir="rtl" className="flex flex-col flex-1">
                      <h3 className="text-black text-lg mb-1">
                        {product.title}
                      </h3>

                      <div className="flex items-center">
                        <span className="text-lg text-amber-400">
                          {product.averageRating || 0}
                        </span>
                        <span className="ml-1 text-sm text-gray-500">
                          (
                          {product.averageRating
                            ? "★".repeat(Math.round(product.averageRating))
                            : "لا تقييم"}
                          )
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // No products message
            <div className="font-bold text-2xl col-span-full text-center">
              لا يوجد منتجات
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddProducts;
