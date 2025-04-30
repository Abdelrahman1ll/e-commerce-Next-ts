import AdminLinks from "@/Components/Admin/AdminLinks";
import CustomersComponents from "@/Components/Admin/CustomersWhoAreNotOnTheSite/CustomersComponents";
import BackButton from "@/Components/BackButton";
import FooterComponents from "@/Components/Home/FooterComponents";
import HeaderComponents from "@/Components/Home/HeaderComponents";
import AdminAuthGuard from "@/Components/utils/AdminAuthGuard";

const Customers = () => {
  return (
    <AdminAuthGuard>
      <div className="pt-20 ">
        <BackButton />
      </div>
      <HeaderComponents user={""} setUser={""} />

      <div className="hidden min-[950px]:block ">
        <div className="flex justify-between ">
          <div className="flex-grow m-5 ">
            <CustomersComponents />
          </div>
          <div className="m-5 ">
            <AdminLinks />
          </div>
        </div>
      </div>
      <div className="hidden max-[950px]:block ">
        <CustomersComponents />
      </div>

      <div className="mt-90">
        <FooterComponents />
      </div>
    </AdminAuthGuard>
  );
};

export default Customers;
