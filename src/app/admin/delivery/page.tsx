import BackButton from "../../../Components/BackButton";
import HeaderComponents from "../../../Components/Home/HeaderComponents";
import FooterComponents from "../../../Components/Home/FooterComponents";
import AdminLinks from "../../../Components/Admin/AdminLinks";
import DeliveryComponents from "../../../Components/Admin/DeliveryComponents";
import AdminAuthGuard from "@/Components/utils/AdminAuthGuard";
const Delivery = () => {
  return (
    <AdminAuthGuard>
      <div className="bg-gray-100 ">
        <div className="pt-20 ">
          <BackButton />
        </div>
        <HeaderComponents user={""} setUser={""} />

        <div className="hidden min-[950px]:block ">
          <div className="flex justify-between ">
            <div className="flex-grow m-5 ">
              <DeliveryComponents />
            </div>
            <div className="m-5 ">
              <AdminLinks />
            </div>
          </div>
        </div>
        <div className="hidden max-[950px]:block ">
          <DeliveryComponents />
        </div>
        <div className="mt-90">
          <FooterComponents />
        </div>
      </div>
    </AdminAuthGuard>
  );
};

export default Delivery;
