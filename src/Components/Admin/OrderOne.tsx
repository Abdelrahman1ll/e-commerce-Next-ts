"use client";
import Image from "next/image";
import { useState } from "react";

type ProductType = {
  _id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  images: string;
  averageRating: number;
  Category: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  brand: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type Props = {
  _id: string;
  createdAt: string;
  status: string;
  paymentMethod: string;
  orderNumber: number;
  user: string;
  cartItems: string[];
  isDelivered: boolean;
  deliveredAt: string;
  isPaid: boolean;
  paidAt: string;
  totalPrice: number;
  taxPrice: number;
  shippingPrice: number;
  discount: number;
  discountPrice: number;
  paymentMethodType: string;
  product: {
    product: ProductType;
    count: number;
  };
};

const OrderOne = (product: Props) => {
  const products = product?.product?.product;
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 border-b border-gray-200">
      {/* صورة المنتج */}
      <div className="relative w-40 h-40 shrink-0 mx-auto md:mx-0">
        {imgLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <Image
          src={products?.images[0]}
          alt={products?.title || "صورة المنتج"}
          width={128}
          height={128}
          className="w-full h-full object-cover rounded-lg"
          onLoadingComplete={() => setImgLoading(false)}
        />
      </div>

      {/* تفاصيل المنتج */}
      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {products?.title || "اسم المنتج"}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {products?.description || "لا يوجد وصف"}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <p className="text-lg font-bold text-blue-600">
            {products?.price?.toFixed(2) || "0.00"} ج.م
          </p>

          <div className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1 rounded-full">
            <span className="text-gray-700">الكمية:</span>
            <span className="font-medium text-green-600">
              {product?.product?.count || 0}
            </span>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-green-600 font-medium">متوفر</span>
          </div>
        </div>

        {products?.Category && (
          <div className="text-sm text-gray-500">
            الفئة: {products?.Category?.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderOne;
