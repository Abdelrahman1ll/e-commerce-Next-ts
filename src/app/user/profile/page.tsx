import BackButton from "../../../Components/BackButton";
import HeaderComponents from "../../../Components/Home/HeaderComponents";
import UserLinks from "../../../Components/User/UserLinks";
import FooterComponents from "../../../Components/Home/FooterComponents";
import ProfileComponents from "../../../Components/User/profileComponents";
import UserAuthGuard from "@/Components/utils/UserAuthGuard";
const Profile = () => {
  return (
    <UserAuthGuard>
      <div className="bg-gray-100">
        <div className="pt-20 ">
          <BackButton />
        </div>
        <HeaderComponents user={""} setUser={""} />

        <div className="hidden min-[950px]:block">
          <div className="flex justify-between">
            <div className="flex-grow mx-8">
              <ProfileComponents />
            </div>
            <div className="m-5">
              <UserLinks />
            </div>
          </div>
        </div>

        <div className="  hidden max-[950px]:block">
          <ProfileComponents />
        </div>

        <div className="mt-80">
          <FooterComponents />
        </div>
      </div>
    </UserAuthGuard>
  );
};

export default Profile;
