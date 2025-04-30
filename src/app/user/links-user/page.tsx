import BackButton from "@/Components/BackButton";
import FooterComponents from "@/Components/Home/FooterComponents";
import HeaderComponents from "@/Components/Home/HeaderComponents";
import UserLinksOnSmallScreens from "@/Components/User/UserLinks-on-small-screens";
import UserAuthGuard from "@/Components/utils/UserAuthGuard";

const LinksUser = () => {
  return (
    <UserAuthGuard>
      <div className="pt-20 bg-gray-100">
        <BackButton />
      </div>
      <HeaderComponents user={""} setUser={""} />
      <UserLinksOnSmallScreens />

      <div className="mt-80">
        <FooterComponents />
      </div>
    </UserAuthGuard>
  );
};

export default LinksUser;
