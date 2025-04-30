import ProductOverviewComponents from "../../../Components/Product/ProductOverviewComponents";
import HeaderComponents from "../../../Components/Home/HeaderComponents";
import FooterComponents from "../../../Components/Home/FooterComponents";
import BackButton from "../../../Components/BackButton";
import ReviewComponent from "../../../Components/Product/ReviewComponent";
import AllProductinCategoryComponents from "@/Components/Product/AllProductinCategoryComponents";
interface Props {
  params: {
    id: string; // الـ id سيأتي من المسار /product/[id]
  };
}
const Product = ({ params }: Props) => {
  return (
    <div className="bg-gray-100">
      <div className="pt-20">
        <BackButton />
      </div>
      <HeaderComponents user={""} setUser={""} />
      <div className="mt-2">
        <ProductOverviewComponents
          id={params?.id}
          _id={""}
          images={[]}
          price={""}
          title={""}
          description={""}
          PriceBeforeDiscount={""}
          quantity={0}
        />
      </div>
      <ReviewComponent id={params?.id} />

      <AllProductinCategoryComponents />

      <FooterComponents />
    </div>
  );
};

export default Product;
