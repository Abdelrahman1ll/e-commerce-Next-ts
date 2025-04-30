import BackButton from "@/Components/BackButton";
import ResetYourPassword from "@/Components/ForgotPassword/ResetPassword";


const ResetPassword = () => {
    return (
        <>
            <div className="pt-5">
                <BackButton/>
            </div>
            <ResetYourPassword/>
        </>
    );
};

export default ResetPassword;