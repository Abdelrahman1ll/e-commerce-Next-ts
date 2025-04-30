import OrderDetailsComponents from "../../../Components/Admin/OrderDetailsComponents";
import BackButton from "../../../Components/BackButton";
import HeaderComponents from "../../../Components/Home/HeaderComponents";
import AdminLinks from "../../../Components/Admin/AdminLinks";
import FooterComponents from "../../../Components/Home/FooterComponents";
import AdminAuthGuard from "@/Components/utils/AdminAuthGuard";
const OrderDetails = () => {
  return (
    <AdminAuthGuard>
      <div className="bg-gray-100">
        <div className="pt-20 ">
          <BackButton />
        </div>
        <HeaderComponents user={""} setUser={""} />

        <div className="hidden min-[950px]:block">
          <div className="flex justify-between">
            <div className="flex-grow m-5">
              <OrderDetailsComponents />
            </div>
            <div className="m-5">
              <AdminLinks />
            </div>
          </div>
        </div>

        <div className="  hidden max-[950px]:block">
          <OrderDetailsComponents />
        </div>

        <div className="mt-50">
          <FooterComponents />
        </div>
      </div>
    </AdminAuthGuard>
  );
};

export default OrderDetails;
