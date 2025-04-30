"use client";
import Image from "next/image";
import { FC, useState } from "react";
import RatingComponent from "../Rating/View-evaluation";
import UseCartComponents from "./Cart-Components";
import Link from "next/link";

// ... (بقية الأنواع تبقى كما هي بدون تغيير)

const CartComponents: FC = () => {
  const { products, isLoading, Data, handleRemove, handleRemoveAll } =
    UseCartComponents();
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <>
      <div dir="rtl" className="mx-auto max-w-3xl px-4">
        <h1 className="text-4xl font-bold pb-6 mb-3 text-center border-b border-gray-300">
          عربة التسوق
        </h1>

        {isLoading ? (
          <div className="animate-pulse space-y-4 mt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        ) : Data?.length ? (
          <>
            {/* Cart Items */}
            <div className="space-y-4">
              {Data?.map((item: CartItemType) => (
                <div
                  key={item?._id || ""}
                  className="flex flex-col md:flex-row items-start gap-4 border-b border-gray-300 pb-4"
                >
                  {/* الصورة */}
                  <div className="relative w-24 h-24 shrink-0">
                    {imgLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
                        <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                    <Image
                      src={item?.product.image || "/placeholder.jpg"}
                      alt={item?.product?.title || "صورة المنتج"}
                      fill
                      sizes="(max-width: 768px) 100vw, 96px"
                      className={`rounded-md object-contain ${
                        imgLoading ? "invisible" : "visible"
                      }`}
                      onLoadingComplete={() => setImgLoading(false)}
                    />
                  </div>

                  {/* تفاصيل المنتج */}
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">
                          {item?.product?.title || ""}
                        </h3>
                        
                        <div className="flex items-center gap-2">
                          <RatingComponent
                            size={20}
                            rating={item?.product?.averageRating || 0}
                          />
                          <span className="text-sm text-gray-500">
                            ({item?.product?.averageRating?.toFixed(1)})
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemove(item?._id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        حذف
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      <p className="text-lg font-bold text-blue-600">
                        {Number(item?.price || 0).toLocaleString("EG", {
                          style: "currency",
                          currency: "EGP",
                        })}
                      </p>

                      <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full">
                        <span className="text-gray-700">الكمية:</span>
                        <span className="font-medium text-green-600">
                          {item?.count?.toLocaleString("EG") || 0}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item?.product.quantity > 0
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            item?.product.quantity > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {item?.product.quantity > 0 ? "متوفر" : "غير متوفر"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* الملخص */}
            <div className="mt-8 space-y-4">
              <div className="flex justify-start items-center gap-4">
                <span className="text-gray-600">المجموع الفرعي:</span>
                <span className="text-xl  font-bold text-blue-600">
                  {Number(products?.totalCartPrice || 0).toLocaleString("EG", {
                    style: "currency",
                    currency: "EGP",
                  })}
                </span>
              </div>

              <p className="text-sm text-gray-500 text-right">
                سيتم حساب الشحن والضرائب عند الدفع
              </p>

              <div className="flex flex-col gap-3">
                <Link href="/order-payment" className="block w-full">
                  <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    صفحة الدفع
                  </button>
                </Link>

                <button
                  onClick={handleRemoveAll}
                  className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  تفريغ العربة
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600 py-12 text-lg">
            عربة التسوق فارغة
          </div>
        )}
      </div>
    </>
  );
};

export default CartComponents;