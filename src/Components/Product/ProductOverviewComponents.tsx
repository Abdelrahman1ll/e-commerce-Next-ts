"use client";
import Image from "next/image";
import { FC, useState } from "react";
import { ShoppingCart } from "lucide-react";
import RatingComponent from "../Rating/View-evaluation";
import UseProductOverviewComponents from "./Product-Overview-Components";
type Props = {
  id: string;
  _id: string;
  images: string[];
  price: string;
  title: string;
  description: string;
  PriceBeforeDiscount: string;
  quantity: number;
};
const ProductOverviewComponents: FC<Props> = (id) => {
  const {
    product,
    images,
    selectedImage,
    handleNextImage,
    quantity,
    setQuantity,
    setSelectedImage,
    handleCart,
  } = UseProductOverviewComponents(id);
  const [imgLoading, setImgLoading] = useState(true);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-md shadow-lg bg-white pt-2  min-[950px]:p-4 mr-4 ml-4">
      <div className="max-w-full mx-auto px-4 ">
        {/* تقسيم المحتوى بصورة grid لتكون الصورة فوق أو جنب التفاصيل بحسب حجم الشاشة */}
        <div className="grid grid-cols-1  md:grid-cols-2 gap-8 items-start">
          {/* قسم تفاصيل المنتج */}
          <div className="order-2 md:order-1">
            <h1 className="text-3xl font-bold mb-2">{product?.title}</h1>
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-2xl font-semibold text-blue-800">
                EGP-{Number(product?.price || 0).toLocaleString("en-US")}
              </div>
              <div className="text-xl font-semibold text-gray-400 line-through">
                EGP-
                {(product?.PriceBeforeDiscount === 0
                  ? Number(product?.price || 0)
                  : Number(product?.PriceBeforeDiscount || 0)
                ).toLocaleString("en-US")}
              </div>
            </div>
            <div className="flex items-center mb-2 ">
              <RatingComponent size={30} rating={product?.averageRating} />

              <span className="ml-1 text-gray-600 text-sm">
                {product?.numReviews} عدد التقييم{" "}
              </span>
            </div>
            <p className="text-gray-700 mb-5 text-3xl">
              {product?.description}
            </p>
            <div className="flex justify-between items-center mb-6">
              {/* عنصر تعديل الكمية */}
              <div className="flex items-center ml-4 bg-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-1 text-2xl font-bold text-gray-600 cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-1 text-lg font-bold text-gray-600 cursor-pointer"
                >
                  +
                </button>
              </div>
              <p className="text-green-600 font-medium">
                {product?.quantity === 0 ? (
                  <span className="text-red-600">
                    <span className="text-red-600">✘</span> غير متوفر
                  </span>
                ) : quantity > product?.quantity ? (
                  <span className="text-red-600">
                    <span className="text-red-600">✘</span> غير متوفر
                  </span>
                ) : (
                  <span className="text-green-600">
                    <span className="text-green-600">✓</span> متوفر
                  </span>
                )}
              </p>
            </div>
            <button
              type="submit"
              className="flex w-full mb-5 justify-center bg-gray-300  py-1 text-2xl text-gray-600 font-semibold  shadow-xs  border-2 border-blue-600  rounded-md "
            >
              EGP-
              {quantity * product?.price}
            </button>
            <button
              onClick={handleCart}
              type="submit"
              className="flex w-full justify-center  rounded-md bg-blue-600 px-3 py-2 text-lg font-semibold text-white shadow-xs hover:bg-blue-500 cursor-pointer mb-4"
            >
              <div className="mr-2 ">
                <ShoppingCart />
              </div>
              اضف للعربة
            </button>
          </div>

          {/* قسم الصورة */}
          <div className="order-1 md:order-2 flex flex-col">
            {/* الصورة الكبيرة مع زر تبديل الصورة */}
            {/* bg-gray-100 */}

            <div className="relative w-11/12 mx-auto h-[400px] md:h-[655px] bg-white rounded-lg overflow-hidden">
              {imgLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <Image
                src={selectedImage || product?.image}
                alt="صورة المنتج"
                fill
                className="object-contain rounded"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                quality={100}
                onLoadingComplete={() => setImgLoading(false)}
              />
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 shadow cursor-pointer"
              >
                <svg
                  className="h-6 w-6 text-gray-800"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                </svg>
              </button>

              <button
                onClick={handleNextImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 shadow cursor-pointer"
              >
                <svg
                  className="h-6 w-6 text-gray-800"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                </svg>
              </button>
            </div>
            {/* الصور المصغرة */}
            <div className="flex space-x-2 mt-3 justify-center">
              {images?.map((img: string, idx: number) => (
                <div
                  key={idx}
                  className="relative w-20 h-25 bg-white border border-gray-200 cursor-pointer hover:border-blue-500 transition-colors rounded"
                  onClick={() => setSelectedImage(img)}
                >
                  <Image
                    src={img}
                    alt={`صورة مصغرة ${idx + 1}`}
                    fill
                    className="object-cover rounded "
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverviewComponents;
