"use client";
// import Image from "next/image";
import DragAndDropUpload from "./DragAndDropUpload";
import UseMaintenanceComponents from "./Maintenance-Components";

interface Address {
  _id: string;
  alias: string;
}

const MaintenanceComponents: React.FC = () => {
  const {
    selected,
    setSelected,
    productDetails,
    setProductDetails,
    selectedAddress,
    setSelectedAddress,
    addresses,
    handleFileUpload,
    handleSubmit,
    errors,
    uploadKey,
    isLoading,
  } = UseMaintenanceComponents();
  return (
    <div dir="rtl" className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">طلب خدمة الصيانة</h1>
      <form className="space-y-4">
        <p>اختر نوع المنتج</p>
        <div className="flex justify-center ">
          <div
            onClick={() => setSelected("ثلاجة")}
            className={`border-2 py-1 px-2 cursor-pointer mx-2 max-[500px]:pt-4 rounded-full 
                        
                        ${
                          selected === "ثلاجة"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        }
                        `}
          >
            ثلاجة
          </div>

          <div
            onClick={() => setSelected("ديب فريزر")}
            className={`border-2 py-1 px-2 cursor-pointer text-center mx-2 rounded-full 
                        
                        ${
                          selected === "ديب فريزر"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        }
                        `}
          >
            ديب فريزر
          </div>

          <div
            onClick={() => setSelected("غسالة اتوماتيك")}
            className={`border-2 py-1 px-2 cursor-pointer text-center mx-2 rounded-full 
                        
                        ${
                          selected === "غسالة اتوماتيك"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        }
                        `}
          >
            غسالة اتوماتيك
          </div>

          <div
            onClick={() => setSelected("سخان")}
            className={`border-2 py-1 px-2 cursor-pointer max-[500px]:pt-4 mx-2 rounded-full 
                        
                        ${
                          selected === "سخان"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        }
                        `}
          >
            سخان
          </div>

          <div
            onClick={() => setSelected("بوتجاز")}
            className={`border-2 py-1 px-2 cursor-pointer max-[500px]:pt-4 mx-2 rounded-full 
                        
                        ${
                          selected === "بوتجاز"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        }
                        `}
          >
            بوتجاز
          </div>
        </div>

        {errors.selected && (
          <p className="text-red-500 text-sm mt-1">{errors.selected}</p>
        )}

        {/* تفاصيل المنتج */}
        <div>
          <label htmlFor="productDetails" className="block mb-1 ">
            شرح الشكوي
          </label>
          <textarea
            id="productDetails"
            value={productDetails}
            onChange={(e) => setProductDetails(e.target.value)}
            placeholder="ادخل شرح الشكوي"
            rows={4}
            required
            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
              ${errors.productDetails ? "outline-red-500" : "outline-gray-300"}
              
              `}
          />
          {errors.productDetails && (
            <p className="text-red-500 text-sm mt-1">{errors.productDetails}</p>
          )}
        </div>

        {/* صورة المنتج */}
        <div>
          <DragAndDropUpload key={uploadKey} onImageUpload={handleFileUpload} />
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">{errors.images}</p>
          )}
        </div>

        {/* اختيار العنوان */}
        <div>
          <label htmlFor="address" className="block mb-1 ">
            اختر العنوان
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
        <p className="text-gray-600 text-sm">
          تحذير لازم تكون مسجل دخول وضايف عنوان
        </p>

        {/* زر تقديم الطلب */}
        <div className="text-center">
  <button
    onClick={handleSubmit}
    type="submit"
    className="bg-blue-700 w-full text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer flex justify-center items-center h-10" // أضفنا هنا classes للتنسيق
  >
    {isLoading ? (
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    ) : (
      <span>تقديم الطلب</span>
    )}
  </button>
</div>
      </form>
    </div>
  );
};

export default MaintenanceComponents;
