"use client";
import { useGetAllUsersQuery } from "@/redux/Admin/ApiProduct";
// import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
// import Link from "next/link";
type Props = {
  name: string;
  email: string;
  date: string;
  _id: string;
  lastName: string;
  number: string;
  updatedAt: string;
};
const ClientsComponents = () => {
  const router = useRouter();
  const { data, isLoading } = useGetAllUsersQuery({});
  const users: Props[] = data?.data?.users || [];
  const isRTL: boolean = router.locale?.startsWith("ar") || false;

  const formatDate = (isoString: string) => {
    if (!isoString) return "N/A";
    try {
      const dateObject = new Date(isoString);
      return dateObject.toISOString().split("T")[0];
    } catch  {
      
      return "Invalid Date";
    }
  };
  return (
    <>
      {
      isLoading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      ):
      
      users?.length === 0 ?(
        <div className="text-center">
            <p className="text-gray-600 text-2xl">لا يوجد مستخدمين</p>
          </div>
      ) : (
        

          users &&
          users.map((user: Props) => {
            const dateOnly = formatDate(user?.updatedAt);
            return (
              <div
                key={user._id}
                dir="rtl"
                className="p-2 mt-1 mb-4 max-w-4xl mx-auto bg-white shadow-md rounded-md border border-gray-200"
              >
                <div className="flex  items-center justify-between ">
                  <div className="flex items-center space-x-4  ">
                    <div className="flex-shrink-0">
                      <div className="flex-shrink-0 w-9 h-9 rounded-full pb-1 bg-gray-600 flex items-center justify-center text-white font-bold text-lg">
                        {user?.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                    </div>
                    <div>
                      <p className="font-bold">
                        {isRTL
                          ? [user?.lastName, user?.name].filter(Boolean).join(" ")
                          : [user?.name, user?.lastName]
                              .filter(Boolean)
                              .join(" ")}
                      </p>
                      <p className="text-sm text-gray-500">{dateOnly}</p>
                    </div>
                  </div>
  
                  <div>
                    <p className="text-sm text-left text-gray-500">
                      {user.email}
                    </p>
                    <p className="text-sm text-left text-gray-500">
                      {user?.number && !/[a-zA-Z]/.test(user.number)
                        ? user.number
                        : "لا يوجد رقم"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
          
        
        
        
        
      )}
    </>
  );
};

export default ClientsComponents;
