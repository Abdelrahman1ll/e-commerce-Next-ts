import FooterComponents from "@/Components/Home/FooterComponents";
import HeaderComponents from "@/Components/Home/HeaderComponents";
import MainComponents from "@/Components/Home/MainComponents";
import TextComponents from "@/Components/Home/textComponents";

export default function Home() {
  return (
   <div className="bg-white">
   <HeaderComponents user={""} setUser={""}/>
   <TextComponents/>
   <MainComponents/>

   <div className="mt-80">
    <FooterComponents/>
   </div>
   </div>
  );
}
