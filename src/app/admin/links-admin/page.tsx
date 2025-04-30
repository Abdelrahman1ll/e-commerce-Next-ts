import AdminLinksOnSmallScreens from "@/Components/Admin/AdminLinks-on-small-screens";
import BackButton from "@/Components/BackButton";
import FooterComponents from "@/Components/Home/FooterComponents";
import HeaderComponents from "@/Components/Home/HeaderComponents";
import AdminAuthGuard from "@/Components/utils/AdminAuthGuard";

const LinkAdmon = () => {
  return (
    <AdminAuthGuard>
      <div className="pt-20">
        <BackButton />
      </div>
      <HeaderComponents user={""} setUser={""} />
      <AdminLinksOnSmallScreens />
      <div className="mt-50">
        <FooterComponents />
      </div>
    </AdminAuthGuard>
  );
};

export default LinkAdmon;
