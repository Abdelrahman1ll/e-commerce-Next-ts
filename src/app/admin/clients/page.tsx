import BackButton from "../../../Components/BackButton";
import HeaderComponents from "../../../Components/Home/HeaderComponents";
import FooterComponents from "../../../Components/Home/FooterComponents";
import AdminLinks from "../../../Components/Admin/AdminLinks";
import ClientsComponents from "../../../Components/Admin/ClientsComponents";
import AdminAuthGuard from "@/Components/utils/AdminAuthGuard";
const Clients = () => {
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
              <ClientsComponents />
            </div>
            <div className="m-5 ">
              <AdminLinks />
            </div>
          </div>
        </div>
        <div className="hidden max-[950px]:block ">
          <ClientsComponents />
        </div>
        <FooterComponents />
      </div>
    </AdminAuthGuard>
  );
};

export default Clients;
