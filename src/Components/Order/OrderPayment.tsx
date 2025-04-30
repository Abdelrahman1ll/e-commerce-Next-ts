"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckIcon } from "lucide-react";
import UseCartComponents from "../Cart/Cart-Components";
import { useCardOrderMutation, usePostOrderMutation } from "@/redux/Orders/ApiOrder";
import { useGetAddressesQuery } from "@/redux/User/ApiUser";
import notify from "../notify";
interface Address {
  _id: string;
  alias: string;
}
const OrderPayment = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [alias, setAlias] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState({
    selectedAddress: "",
    paymentMethod: "",
  });
  const { data } = useGetAddressesQuery({});
  const addresses = data?.addresses || [];

  const { products, Id } = UseCartComponents();
  const [postOrder, { isLoading }] = usePostOrderMutation();
  const [cardOrder] = useCardOrderMutation();

  useEffect(() => {
    if (selectedAddress) {
      const address = addresses.find((a: Address) => a._id === selectedAddress);
      if (address) {
        setAlias(address.alias);
        setDetails(address.details);
        setPhone(address.phone);
        setCity(address.city);
      }
    }
  }, [selectedAddress, addresses]);
  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { ...errors };

    if (selectedAddress === "") {
      newErrors.selectedAddress = "الرجاء اختيار عنوان";
      valid = false;
    } else {
      newErrors.selectedAddress = "";
    }

    if (paymentMethod === null) {
      newErrors.paymentMethod = "الرجاء اختيار طريقة الدفع";
      valid = false;
    } else {
      newErrors.paymentMethod = "";
    }

    setErrors(newErrors);

    if (valid) {
      if (paymentMethod === "cash") {
        try {
          await postOrder({
            cartId: Id,
            shippingAddress: {
              alias: alias,
              details: details,
              phone: phone,
              city: city,
            },
          }).unwrap();
          notify("تم انشاء الطلب بنجاح", "success");
         
          
            window.location.href = "/user/order";
      
        } catch (error) {
          if(error?.data?.message === "Product is out of stock. Available quantity") {
            notify("الكمية المطلوبة غير متوفرة", "error");
          }else if (error?.data?.message === "User not found" || error?.data?.message === "Cannot read properties of null (reading '_id')") {
            notify("المونتج غير موجود", "error");
          }else {
            notify("خطاء في انشاء الطلب", "error");
          }
        }
      } else if (paymentMethod === "visa") {
        try {
         const response = await cardOrder({
            cartId: Id,
            shippingAddress: {
              alias: alias,
              details: details,
              phone: phone,
              city: city,
            },
          }).unwrap();
          router.push(response?.data?.paymentUrl);
          
        } catch  {
          
          notify("خطاء في انشاء الطلب", "error");
        }
      }
    }
  };

  return (
    <form className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">إتمام الطلب</h1>
      <div dir="rtl" className="mb-4">
        <p className="text-lg font-semibold mb-2">اختر طريقة الدفع:</p>
        <div>
          {/* خيار الدفع بالفيزا */}
          <div
            onClick={() => setPaymentMethod("visa")}
            className="flex items-center justify-start space-x-2 mb-6 cursor-pointer"
          >
            <div
              className={`w-6 h-6 border rounded-full flex items-center justify-center transition-colors duration-200 ${
                paymentMethod === "visa"
                  ? "bg-blue-500 border-blue-500"
                  : "bg-white border-gray-300"
              }`}
            >
              {paymentMethod === "visa" && (
                <CheckIcon className="w-4 h-4 text-white" />
              )}
            </div>
            <span className="text-lg font-medium">دفع بالفيزا</span>
          </div>

          {/* خيار الدفع نقدًا عند الاستلام */}
          <div
            onClick={() => setPaymentMethod("cash")}
            className="flex items-center justify-start space-x-2 mb-6 cursor-pointer"
          >
            <div
              className={`w-6 h-6 border rounded-full flex items-center justify-center transition-colors duration-200 ${
                paymentMethod === "cash"
                  ? "bg-blue-500 border-blue-500"
                  : "bg-white border-gray-300"
              }`}
            >
              {" "}
              {paymentMethod === "cash" && (
                <CheckIcon className="w-4 h-4 text-white" />
              )}
            </div>
            <span className="text-lg font-medium">الدفع كاش عند الاستلام</span>
          </div>

          <div className="mb-2">
            <label
              htmlFor="address"
              className="block mb-3 text-lg font-semibold "
            >
              اختر العنوان:
            </label>
            <select
              id="address"
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
              required
              className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
              ${errors.selectedAddress ? "outline-red-500" : "outline-gray-300"}
              
              `}
            >
              <option value="" disabled>
                اختر عنواناً
              </option>
              {Array.isArray(addresses) &&
                addresses.map((address: Address) => {
                  return (
                    <option key={address._id} value={address._id}>
                      {address.alias}
                    </option>
                  );
                })}
            </select>
            {errors.selectedAddress && (
              <p className="text-red-500 text-sm mt-1">
                {errors.selectedAddress}
              </p>
            )}
          </div>
          <p className="text-gray-600 text-sm mb-4">
            تحذير لازم تكون مسجل دخول وضايف عنوان
          </p>
        </div>
        <div className="flex ">
          <p>سعر الشحن:</p>
          <div className="text-blue-600">({products?.deliveryPrice || 0})</div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full mb-2 text-lg p-1 bg-gray-300 text-blue-600 rounded border-2 border-gray-400 transition-colors"
      >
        {products?.totalPrice || 0} ج.م
      </button>
    


      <button
  type="submit"
  onClick={handleOrder}
  className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors relative"
>
  {isLoading ? (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  ) : null}
  <span className={`${isLoading ? 'invisible' : 'visible'}`}>تأكيد الطلب</span>
</button>
    </form>
  );
};

export default OrderPayment;
