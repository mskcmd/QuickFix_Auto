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
import MechnichData from "../Pages/user/MechnichData.tsx";
import MechanicDetails from "../Pages/user/MechanicDetails.tsx";
import UserLogdin from "../Components/User/UserCommen/UserLogdin.tsx";
import UserProfile from "../Pages/user/UserProfile.tsx";
import MechBooking from "../Pages/user/MechBooking.tsx";

function userRoutes() {
  return (
    <Routes>
      <Route path="mechanicData" element={<MechnichData />} />
      <Route path="mechanicData/:id" element={<MechanicDetails />} />
      <Route path="/home" element={<Home />} />
      <Route element={<UserLoggedOut />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="otp-page" element={<Otppage />} />
        <Route path="forget/otp-page/:userId" element={<OTPComponent />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="forgetPassword" element={<ForgertPasswort />} />
        <Route path="/reset/:userid" element={<RestOtp />} />
      </Route>
      <Route element={<UserLogdin />}>
          <Route path="profiler" element={<UserProfile />} />
          <Route path="booking/:id" element={<MechBooking />} />
      </Route>

      <Route path="*" element={<Erorr404 />}></Route>
    </Routes>
  );
}

export default userRoutes;
