"use client";
import { useGetOrderQuery } from "@/redux/Orders/ApiOrder";
import OrderOne from "../Admin/OrderOne";
import { useEffect } from "react";

const OrderComponents = () => {
  const { data, isLoading, refetch } = useGetOrderQuery({});

  const condition = data?.data;

  useEffect(() => {
    refetch();
  }, []);

  type ProductType = {
    _id: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
    images: string[]; // Added images property
    averageRating: number;
    Category: string;
    brand: string;
    createdAt: string;
    updatedAt: string;
    __v: number; // Added __v property
    // Add any other properties required by OrderOne's ProductType
  };

  type CartItemType = {
    _id: string;
    product: ProductType;
    count: number;
  };

  type OrderType = {
    _id: string;
    createdAt: string;
    status: string;
    paymentMethod: string;
    orderNumber: number;
    user: string;
    cartItems: CartItemType[];
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
  };
  return (
    <>
      <div>
        <h1 className="text-2xl text-center font-bold text-gray-800">
          الطلبات
        </h1>
      </div>
      {condition?.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold text-gray-800">لا يوجد طلبات</h1>
        </div>
      ) : isLoading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      ) : (
        condition &&
        condition.map((item: OrderType) => {
          let dateOnly;
          if (item?.createdAt) {
            const isoString = item?.createdAt;
            const dateObject = new Date(isoString);
            dateOnly = dateObject.toISOString().split("T")[0];
          }
          return (
            <div key={item?._id} className="max-[950px]:m-4">
              <div className="flex  max-w-4xl mx-auto justify-between mt-5 px-2">
                <p className="text-sm text-gray-500 mt-1">
                  تاريخ الطلب: {dateOnly}{" "}
                </p>
                <h2 className="text-xl font-bold text-gray-800">
                  رقم الطلب: #{item?.orderNumber}
                </h2>
              </div>
              <div
                dir="rtl"
                className="p-2 mt-1 max-w-4xl mx-auto bg-white shadow-md rounded-md border border-gray-200"
              >
                {/* قائمة المنتجات */}
                <div className="mt-1 space-y-6">
                  {item?.cartItems &&
                    item?.cartItems.map((item) => {
                      return <OrderOne key={item?._id} product={item} />;
                    })}
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium">
                      المجموع الكلي:
                    </span>
                    <span className="text-blue-600 font-bold">
                      {item.totalPrice.toFixed(2)} ج.م
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* حالة التوصيل */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700 font-medium">
                        حالة التوصيل:
                      </span>
                      <span
                        className={`font-medium ${
                          item.isDelivered ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {item.isDelivered ? "تم التوصيل" : "قيد التوصيل"}
                      </span>
                    </div>

                    {/* حالة الدفع */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700 font-medium">
                        حالة الدفع:
                      </span>
                      <span
                        className={`font-medium ${
                          item.isPaid ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {item.isPaid ? "تم الدفع" : "معلق"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default OrderComponents;
