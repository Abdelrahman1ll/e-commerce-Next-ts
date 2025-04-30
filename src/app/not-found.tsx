import BackButton from "@/Components/BackButton";
import FooterComponents from "@/Components/Home/FooterComponents";
import HeaderComponents from "@/Components/Home/HeaderComponents";

const notFound = () => {
  return (
    <>
      <div className="pt-20">
        <BackButton />
      </div>
      <HeaderComponents user={""} setUser={""} />
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-4xl font-bold">404 Not Found</h1>
        <p className="text-2xl">The page you are looking for does not exist</p>

      </div>

      <div className="mt-120">
        <FooterComponents />
      </div>
    </>
  );
};

export default notFound;
