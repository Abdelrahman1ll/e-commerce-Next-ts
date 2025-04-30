import CartComponents from "../../Components/Cart/CartComponents";
import HeaderComponents from "../../Components/Home/HeaderComponents";
import BackButton from "../../Components/BackButton";
import FooterComponents from "../../Components/Home/FooterComponents";

const Cart = () => {
  return (
    <>
    <div className="mt-20">
      <BackButton />
      </div>
      <HeaderComponents user={""} setUser={""} />
      <CartComponents />
      <div className="mt-150">
      <FooterComponents />
      </div>
     
    </>
  );
};

export default Cart;
