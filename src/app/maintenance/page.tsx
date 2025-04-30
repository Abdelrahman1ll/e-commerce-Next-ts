import HeaderComponents from "../../Components/Home/HeaderComponents";
import BackButton from "../../Components/BackButton";
import FooterComponents from "../../Components/Home/FooterComponents";

import MaintenanceComponents from "../../Components/Maintenance/maintenanceComponents";
const Maintenance = () => {
  return (
    <>
      <div className="mt-20">
        <BackButton />
      </div>
      <HeaderComponents />
      <MaintenanceComponents />
      <FooterComponents />
    </>
  );
};

export default Maintenance;
