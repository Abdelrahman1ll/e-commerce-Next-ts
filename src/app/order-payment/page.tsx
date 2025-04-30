import BackButton from "@/Components/BackButton";
import FooterComponents from "@/Components/Home/FooterComponents";
import HeaderComponents from "@/Components/Home/HeaderComponents";
import OrderPayment from "@/Components/Order/OrderPayment";

const OrderPaymentPage = () => {
  return (
    <div>
      <div className="pt-20">
        <BackButton />
      </div>
      <HeaderComponents user={""} setUser={""} />

        <OrderPayment/>
        <div className="mt-80">
      <FooterComponents />
      </div>
    </div>
  );
};

export default OrderPaymentPage;
