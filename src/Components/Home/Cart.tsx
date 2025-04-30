"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ProductTy = {
  _id: string;
  title: string;
  price: string;
  image: string;
  averageRating: number;
  quantity: number;
  description: string;
  Category: string;
  brand: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
};
const Cart = ({ product }: { product: ProductTy }) => {
  const [imgLoading, setImgLoading] = useState(true);
  return (
    <>
      <div className="group relative">
        <Link
          href={`/product/${product?._id}`}
          className="absolute inset-0 z-20"
        />

        <div className="relative">
          {imgLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <Image
            src={product?.image}
            alt={product?.title}
            width={320}
            height={320}
            priority // تعيين خاصية  priority لتحميل الصورة بشكل أسرع
            quality={100} // تعيين جودة الصورة إلى 100
            onLoadingComplete={() => setImgLoading(false)} // تعيين حالة التحميل إلى false عند الانتهاء من تحميل الصورة
            className={`aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75
              ${
                product?.quantity === 0
                  ? "opacity-50"
                  : "transition duration-300 ease-in-out transform hover:scale-105"
              }
              `}
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
          {(Number(product?.price || 0)).toLocaleString('en-US')} ج.م
          </p>

          <div dir="rtl" className="flex flex-col flex-1">
            <h3 className="text-black text-lg mb-1">{product.title}</h3>

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
    </>
  );
};

export default Cart;
