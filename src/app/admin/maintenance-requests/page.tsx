import BackButton from "../../../Components/BackButton";
import HeaderComponents from "../../../Components/Home/HeaderComponents";
import AdminLinks from "../../../Components/Admin/AdminLinks";
import FooterComponents from "../../../Components/Home/FooterComponents";
import MaintenanceRequestsComponents from "../../../Components/Admin/MaintenanceRequestsComponents";
import AdminAuthGuard from "@/Components/utils/AdminAuthGuard";
const MaintenanceRequests = () => {
  return (
    <AdminAuthGuard>
      <div className="mt-20">
        <BackButton />
      </div>
      <HeaderComponents user={""} setUser={""} />
      <div className="hidden min-[950px]:block">
        <div className="flex justify-between">
          <div className="flex-grow m-5">
            <MaintenanceRequestsComponents />
          </div>
          <div className="m-5">
            <AdminLinks />
          </div>
        </div>
      </div>

      <div className="  hidden max-[950px]:block">
        <MaintenanceRequestsComponents />
      </div>

      <FooterComponents />
    </AdminAuthGuard>
  );
};

export default MaintenanceRequests;
