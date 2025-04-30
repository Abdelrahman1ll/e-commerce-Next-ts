"use client";
import {
  useGetAllOrderQuery,
  usePutDeliverMutation,
  usePutPayMutation,
} from "@/redux/Orders/ApiOrder";
import OrderOne from "./OrderOne";
import { useEffect } from "react";
import notify from "../notify";

type OrderType = {
  _id: string;
  createdAt: string;
  status: string;
  paymentMethodType: string;
  paymentMethod: string;
  products: ProductType[];
  orderNumber: number;
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
  user: { number: string; name: string; email: string; _id: string };
  shippingAddress: {
    alias: string;
    city: string;
    details: string;
    phone: string;
    postalCode: string;
    _id: string;
  };
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  price: string;
  quantity: number;
  image: string;
};

const OrderDetailsComponents = () => {
  const { data, isLoading, refetch } = useGetAllOrderQuery({});
  const orderDetails = data?.data;
  
  useEffect(() => { refetch() }, []);

  const [putPay, { isLoading: isUpdating }] = usePutPayMutation();
  const [putDeliver, { isLoading: isUpdatingDeliver }] = usePutDeliverMutation();

  const handleTogglePay = async (id: string) => {
    try {
      await putPay(id).unwrap();
      refetch();
    } catch { notify("حدث خطا ما", "error"); }
  };

  const handleToggleDeliver = async (id: string) => {
    try {
      await putDeliver(id).unwrap();
      refetch();
    } catch { notify("حدث خطا ما", "error"); }
  };

  return (
    <div  className="p-4" dir="rtl">
      <h1 className="text-2xl text-center font-bold text-gray-800 mb-6">
        الطلبات: {data?.amount || 0}
      </h1>

      {isLoading ? (
        <div className="animate-pulse space-y-4 max-w-4xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg" />
          ))}
        </div>
      ) : orderDetails?.length === 0 ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <h1 className="text-2xl font-bold text-gray-800">لا يوجد طلبات</h1>
        </div>
      ) : (
        orderDetails?.map((item: OrderType) => {
          const orderDate = item?.createdAt 
            ? new Date(item.createdAt).toLocaleDateString('ar-EG')
            : '';

          return (
            <div key={item._id} className="mb-8 max-w-4xl mx-auto">
              {/* رأس الطلب */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 bg-gray-50 rounded-t-lg">
                <p className="text-sm text-gray-500">
                  تاريخ الطلب: {orderDate}
                </p>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  رقم الطلب: #{item.orderNumber}
                </h2>
              </div>

              {/* جسم الطلب */}
              <div className="bg-white shadow-md rounded-b-lg border border-gray-200 p-4">
                {/* معلومات العنوان والعميل */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-200">
                  {/* عنوان التسليم */}
                  <div className="space-y-2">
                    <h2 className="text-lg font-bold text-gray-800 mb-2">
                      عنوان التسليم
                    </h2>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">المكان:</span> {item.shippingAddress?.alias}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">التفاصيل:</span> {item.shippingAddress?.details}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">الهاتف:</span> {item.shippingAddress?.phone}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">المحافظة:</span> {item.shippingAddress?.city}
                      </p>
                    </div>
                  </div>

                  {/* بيانات العميل */}
                  <div className="space-y-2">
                    <h2 className="text-lg font-bold text-gray-800 mb-2">
                      بيانات العميل
                    </h2>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">الاسم:</span> {item.user?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">البريد:</span> {item.user?.email}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">الهاتف:</span> {item.user?.number}
                      </p>
                    </div>
                  </div>
                </div>

                {/* قائمة المنتجات */}
                <div className="mt-6 space-y-4">
                  {item.cartItems?.map((cartItem) => (
                    <OrderOne key={cartItem._id} product={cartItem} />
                  ))}
                </div>

                {/* المدفوعات والحالة */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium">المجموع الكلي:</span>
                    <span className="text-blue-600 font-bold">
                      {item.totalPrice.toFixed(2)} ج.م
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* حالة التوصيل */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700 font-medium">حالة التوصيل:</span>
                      <span className={`font-medium ${
                        item.isDelivered ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.isDelivered ? 'تم التوصيل' : 'قيد التوصيل'}
                      </span>
                    </div>
                    
                    {/* حالة الدفع */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700 font-medium">حالة الدفع:</span>
                      <span className={`font-medium ${
                        item.isPaid ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.isPaid ? 'تم الدفع' : 'معلق'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* أزرار التحكم */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleToggleDeliver(item._id)}
                    disabled={isUpdatingDeliver}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
                  >
                    {isUpdatingDeliver ? 'جاري التحديث...' : 'تغيير حالة التوصيل'}
                  </button>

                  <button
                    onClick={() => handleTogglePay(item._id)}
                    disabled={isUpdating}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
                  >
                    {isUpdating ? 'جاري التحديث...' : 'تغيير حالة الدفع'}
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default OrderDetailsComponents;