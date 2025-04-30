import BackButton from "../../../Components/BackButton";
import HeaderComponents from "../../../Components/Home/HeaderComponents";
import UserLinks from "../../../Components/User/UserLinks";
import FooterComponents from "../../../Components/Home/FooterComponents";
import AddressComponents from "../../../Components/User/AddressComponents";
import UserAuthGuard from "@/Components/utils/UserAuthGuard";

const Address = () => {
  return (
    <UserAuthGuard>
    <div className="bg-gray-100">
      <div className="pt-20">
        <BackButton />
      </div>
      <HeaderComponents user={""} setUser={""} />

      <div className="hidden min-[950px]:block">
        <div className="flex justify-between">
          <div className="flex-grow m-5">
            <AddressComponents />
          </div>
          <div className="m-5">
            <UserLinks />
          </div>
        </div>
      </div>

      <div className="  hidden max-[950px]:block">
      <AddressComponents />
      </div>
      <div className="mt-80">
        <FooterComponents />
      </div>
    </div>
    </UserAuthGuard>
  );
};

export default Address;
