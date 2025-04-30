"use client";
import { useGetAllMaintenanceQuery } from "@/redux/Orders/ApiMaintenance";
import Image from "next/image";
import { useEffect, useState } from "react";
type Props = {
  _id: string;
  results: number;
  updatedAt: string;
  orderNumber: number;
  title: string;
  alias: string;
  description: string;
  details: string;
  phone: string;
  city: string;
  image: string;
  user: {
    name: string;
    email: string;
    number: string;
  };
};
const MaintenanceRequestsComponents = () => {
  const { data,refetch,isLoading } = useGetAllMaintenanceQuery({});
  const maintenanceRequests = data?.data;
  useEffect(() => {
      refetch();
    }, []);
  const [imgLoading, setImgLoading] = useState(true);
  return (
    <>
      <div>
        <h1 className="text-2xl text-center font-bold text-gray-800">
          طلبات الصيانة :{data?.results || 0}
        </h1>
      </div>
      {
        isLoading ? (
          <div className="animate-pulse space-y-4 ">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 mx-auto bg-gray-200 rounded-lg"></div>
          ))}
        </div>
        ):( 

          maintenanceRequests && maintenanceRequests?.length > 0 ? (
            maintenanceRequests?.map((maint: Props) => {
              let dateOnly;
              if (maint?.updatedAt) {
                const isoString = maint?.updatedAt;
                const dateObject = new Date(isoString);
                dateOnly = dateObject.toISOString().split("T")[0];
              }
              return (
                <div key={maint._id} >
                  <div className="flex  max-w-4xl mx-auto justify-between mt-5 px-2">
                    <p className="text-sm text-gray-500 mt-1">
                      تاريخ الطلب: {dateOnly}
                    </p>
                    <h2 className="text-xl font-bold text-gray-800">
                      رقم الطلب: #{maint?.orderNumber || 0}
                    </h2>
                  </div>
                  <div
                    dir="rtl"
                    className="p-4 mt-1 max-w-4xl mx-auto bg-white shadow-md rounded-md border border-gray-200"
                  >
                    {/* رأس الصفحة (تفاصيل الطلب) */}
                    <div className="min-[750px]:flex justify-between ">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          عنوان المشكلة
                        </h2>
    
                        <div className="flex flex-row">
                          <p className="text-sm text-black-500 mt-1 ml-1 ">
                            المكان:
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {maint?.alias || "لا يوجد مكان محدد"}
                          </p>
                        </div>
    
                        <div className="flex flex-row w-full">
                          <p className="text-sm text-black-500 mt-1 ml-1  ">
                            تفاصيل:
                          </p>
                          <p className="text-sm text-gray-500 mt-1 ">
                            {maint?.details || "لا يوجد تفاصيل"}
                          </p>
                        </div>
    
                        <div className="flex flex-row w-full">
                          <p className="text-sm text-black-500 mt-1 ml-1  ">
                            الرقم التوصيل:
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {maint?.phone || "لا يوجد رقم توصيل"}
                          </p>
                        </div>
    
                        <div className="flex flex-row w-full">
                          <p className="text-sm text-black-500 mt-1 ml-1  ">
                            المحافظة:
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {maint?.city || "لا يوجد محافظة"}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-xl mt-2 font-bold text-gray-800">
                          بيانات العميل
                        </h2>
                        <div className="flex flex-row">
                          <p className="text-sm text-black-500 mt-1 ml-1">اسم:</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {maint?.user.name || "لا يوجد اسم"}
                          </p>
                        </div>
    
                        <div className="flex flex-row">
                          <p className="text-sm text-black-500 mt-1 ml-1">
                            البريد الإلكتروني:
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {maint?.user.email || "لا يوجد بريد إلكتروني"}
                          </p>
                        </div>
    
                        <div className="flex flex-row">
                          <p className="text-sm text-black-500 mt-1 ml-1">الرقم:</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {maint?.user.number || "لا يوجد رقم"}
                          </p>
                        </div>
                      </div>
                    </div>
    
                    {/* قائمة المنتجات */}
                    <div className="mt-2 space-y-6">
                      {/* المنتج الأول */}
                      <div className="min-[550px]:flex  ">
                        <div className="relative ">
                      {imgLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white">
                          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                        <Image
                          src={maint?.image || ""}
                          alt="حقيبة ظهر صغيرة"
                          className="w-50 h-50 ml-3 mt-2 object-cover rounded-md mb-2"
                          width={280}
                          height={280}
                          onLoadingComplete={() => setImgLoading(false)}

                        />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-800">
                            {" "}
                            {maint?.title || "لا يوجد عنوان"}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {maint?.description || "لا يوجد وصف"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
    
            <div>
              <h2 className="text-xl text-center font-bold text-gray-800">
                لا يوجد طلبات
              </h2>
            </div>
            )

        )


     

      }
    </>
  );
};

export default MaintenanceRequestsComponents;
