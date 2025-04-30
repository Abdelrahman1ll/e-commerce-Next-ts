"use client";
import { useGetMaintenanceQuery } from "@/redux/Orders/ApiMaintenance";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  updatedAt?: string;
  _id?: string;
  orderNumber?: string;
  description?: string;
  image?: string;
  title?: string;
};
const MaintenanceRequestsComponents = () => {

  const { data, refetch, isLoading } = useGetMaintenanceQuery({});
  const MaintenanceData = data?.data;
  const [imgLoading, setImgLoading] = useState(true);
  useEffect(() => {
    refetch();
  }, []);

  
  
  return (
    <>
      <div>
        <h1 className="text-2xl text-center font-bold text-gray-800">
          طلبات الصيانة
        </h1>
      </div>
      <div className="max-[950px]:m-4">
        {isLoading ? (
          <div className="animate-pulse space-y-4 ">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 mx-auto bg-gray-200 rounded-lg"
              ></div>
            ))}
          </div>
        ) : MaintenanceData?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-xl font-bold text-gray-800">
              لا توجد طلبات صيانة
            </h2>
          </div>
        ) : (
          MaintenanceData &&
          MaintenanceData?.map((item: Props) => {
            let dateOnly;
            if (item?.updatedAt) {
              const isoString = item?.updatedAt;
              const dateObject = new Date(isoString);
              dateOnly = dateObject.toISOString().split("T")[0];
            }
            return (

              <div key={item?._id}>
                <div className="flex  max-w-4xl mx-auto justify-between mt-5 px-2">
                  <p className="text-sm text-gray-500 mt-1">
                    تاريخ الطلب: {dateOnly}
                  </p>
                  <h2 className="text-xl font-bold text-gray-800">
                    رقم الطلب: #{item?.orderNumber}
                  </h2>
                </div>
                <div
                  dir="rtl"
                  className=" mt-1 max-w-4xl mx-auto bg-white shadow-md rounded-md border border-gray-200"
                >
                  {/* قائمة المنتجات */}
                  <div className="mt-2 ">
                    {/* المنتج الأول */}
                    <div  className="flex flex-row  ">
                      <div className="relative ">
                      {imgLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white">
                          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                      
                      <Image
                        src={item?.image || ""}
                        alt={item?.title || ""}
                        width={110}
                        height={110}
                        priority
                        quality={100}
                        className="w-30 h-30 ml-3 mt-2 object-cover rounded-md mr-4 "

                        onLoadingComplete={() => setImgLoading(false)}
                      />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-800">
                          {item?.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {item?.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-center pb-2 text-emerald-900">
                      هيتم التوصل معك في اقرب وقت
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default MaintenanceRequestsComponents;
