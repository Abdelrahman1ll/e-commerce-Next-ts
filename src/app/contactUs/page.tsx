import BackButton from "../../Components/BackButton";
import HeaderComponents from "../../Components/Home/HeaderComponents";
import FooterComponents from "../../Components/Home/FooterComponents";

import ContactUsComponents from "../../Components/ContactUs/contactUsComponents";
const ContactUs = () => {
  return (
    <>
      <div className="mt-20">
        <BackButton />
      </div>
      <HeaderComponents user={""} setUser={""} />
      <ContactUsComponents />
      <div className="mt-50">
      <FooterComponents />
      </div>
      
    </>
  );
};

export default ContactUs;
