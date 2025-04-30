import BackButton from "../../../Components/BackButton";
import HeaderComponents from "../../../Components/Home/HeaderComponents";
import FooterComponents from "../../../Components/Home/FooterComponents";
import AdminLinks from "../../../Components/Admin/AdminLinks";
import AddCategoryComponents from "../../../Components/Admin/Category/CategoryComponents";
import AdminAuthGuard from "@/Components/utils/AdminAuthGuard";
const Category = () => {
  return (
    <AdminAuthGuard>
      <div className="pt-20 ">
        <BackButton />
      </div>
      <HeaderComponents user={""} setUser={""} />

      <div className="hidden min-[950px]:block ">
        <div className="flex justify-between ">
          <div className="flex-grow m-5 ">
            <AddCategoryComponents />
          </div>
          <div className="m-5 ">
            <AdminLinks />
          </div>
        </div>
      </div>
      <div className="hidden max-[950px]:block ">
        <AddCategoryComponents />
      </div>
      <div className="mt-50">
        <FooterComponents />
      </div>
    </AdminAuthGuard>
  );
};

export default Category;
