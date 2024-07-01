import UserLoggedOut from "../Components/User/UserCommen/UserLoggedOut";
import LoginPage from "../Pages/user/LoginPage";
import SignupPage from "../Pages/user/SignupPage";
import Otppage from "../Pages/user/Otppage.tsx";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/user/Home.tsx";
import ForgertPasswort from "../Pages/user/ForgertPasswort.tsx";
import RestOtp from "../Pages/user/RestOtp.tsx";
import OTPComponent from "../Pages/user/OtpPassReset.tsx";
import Erorr404 from "../Components/Common/ErorrPage/Erorr404.tsx";

function userRoutes() {
  return (
    <Routes>
    <Route path="/home" element={<Home />} />
      <Route element={<UserLoggedOut />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="otp-page" element={<Otppage />} />
        <Route path="forget/otp-page/:userId" element={<OTPComponent />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="forgetPassword" element={<ForgertPasswort/>}/>
        <Route path="/reset/:userid" element={<RestOtp/>}/>
      </Route>
      <Route path="*" element={<Erorr404/>}></Route>
    </Routes>
  );
}

export default userRoutes;
