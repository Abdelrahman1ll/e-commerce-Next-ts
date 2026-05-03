import ProductOverviewComponents from "../../../Components/Product/ProductOverviewComponents";
import HeaderComponents from "../../../Components/Home/HeaderComponents";
import FooterComponents from "../../../Components/Home/FooterComponents";
import BackButton from "../../../Components/BackButton";
import ReviewComponent from "../../../Components/Product/ReviewComponent";
import AllProductinCategoryComponents from "@/Components/Product/AllProductinCategoryComponents";
interface Props {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Product = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <div className="bg-gray-100">
      <div className="pt-20">
        <BackButton />
      </div>
      <HeaderComponents />
      <div className="mt-2">
        <ProductOverviewComponents
          id={id}
          _id={""}
          images={[]}
          price={""}
          title={""}
          description={""}
          PriceBeforeDiscount={""}
          quantity={0}
        />
      </div>
      <ReviewComponent id={id} />

      <AllProductinCategoryComponents />

      <FooterComponents />
    </div>
  );
};

export default Product;
