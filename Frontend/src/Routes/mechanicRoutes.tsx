import { Route, Routes } from "react-router-dom"
import MechanicLoggedOut from "../Components/Mechanic/MechanicCommen/MechanicLoggedOut"
import LoginPage from "../Pages/mechanic/LoginPage"
import SignupPage from "../Pages/mechanic/SignupPage"
import MOtppage from "../Pages/mechanic/Otppage.tsx";
import MechanicLoggedin from "../Components/Mechanic/MechanicCommen/MechanicLoggedin.tsx";
import RegisterOne from "../Components/Mechanic/MechanicCommen/RegisterOne.tsx";
import MechanicHome from "../Pages/mechanic/MechanicHome.tsx";
import ForgotPassword from "../Pages/mechanic/ForgotPassword.tsx";
import OTPComponent1 from "../Pages/mechanic/OtpPassReset.tsx";
import RestOtp from "../Pages/mechanic/RestOtp.tsx";

function mechanicRoutes() {
  return (
    
    <Routes>
    <Route element={<MechanicLoggedOut />}>
      <Route path="login" element={<LoginPage />} />
      <Route path="otp-page" element={<MOtppage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="forgetPassword" element={< ForgotPassword/>}/>
      <Route path="forget/otp-page/:userId" element={<OTPComponent1 />} />
      <Route path="reset/:userid" element={<RestOtp/>}/>

    </Route>

    <Route element={<MechanicLoggedin />}>
      <Route path="register" element={<RegisterOne />} />
      <Route path="home" element={<MechanicHome />} />
    </Route>
  </Routes>  )
}

export default mechanicRoutes