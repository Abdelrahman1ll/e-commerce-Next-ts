import LogInComponents from "../../Components/Login/loginComponents";
import BackButton from "../../Components/BackButton";
const LogIn = () => {
  return (
    <div>
    <div className="pt-5">
    <BackButton />
    </div>
      
      <LogInComponents />
    </div>
  );
};

export default LogIn;
