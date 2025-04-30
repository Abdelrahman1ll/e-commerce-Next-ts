import BackButton from "../../../Components/BackButton";
import HeaderComponents from "../../../Components/Home/HeaderComponents";
import FooterComponents from "../../../Components/Home/FooterComponents";
import OrderComponents from "../../../Components/User/OrderComponents";
import UserLinks from "../../../Components/User/UserLinks";
import UserAuthGuard from "@/Components/utils/UserAuthGuard";

const Order = () => {
  return (
    <UserAuthGuard>
      <div className="bg-gray-100 ">
        <div className="pt-20 ">
          <BackButton />
        </div>
        <HeaderComponents user={""} setUser={""} />
        <div className="hidden min-[950px]:block">
          <div className="flex justify-between">
            <div className="flex-grow m-5">
              <OrderComponents />
            </div>
            <div className="m-5">
              <UserLinks />
            </div>
          </div>
        </div>

        <div className="  hidden max-[950px]:block">
          <OrderComponents />
        </div>

        <div className="mt-100 ">
          <FooterComponents />
        </div>
      </div>
    </UserAuthGuard>
  );
};

export default Order;
