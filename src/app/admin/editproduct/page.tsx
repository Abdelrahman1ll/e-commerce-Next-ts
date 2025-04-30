import BackButton from "../../../Components/BackButton";
import HeaderComponents from "../../../Components/Home/HeaderComponents";
import FooterComponents from "../../../Components/Home/FooterComponents";
import AdminLinks from "../../../Components/Admin/AdminLinks";
import AddProducts from "../../../Components/Admin/ProductAdmin/AllProductsComponents";
import AdminAuthGuard from "@/Components/utils/AdminAuthGuard";
const AddProductPage = () => {
  return (
    <AdminAuthGuard>
      <div className="pt-20 mb-2 ">
        <BackButton />
      </div>
      <HeaderComponents user={""} setUser={""} />

      <div className="hidden min-[950px]:block">
        <div className="flex justify-between">
          <div className="flex-grow m-5">
            <AddProducts />
          </div>
          <div className="m-5">
            <AdminLinks />
          </div>
        </div>
      </div>

      <div className="  hidden max-[950px]:block">
        <AddProducts />
      </div>
      <FooterComponents />
    </AdminAuthGuard>
  );
};

export default AddProductPage;
