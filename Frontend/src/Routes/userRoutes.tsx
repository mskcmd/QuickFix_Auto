import UserLoggedOut from "../Components/User/UserCommen/UserLoggedOut";
import LoginPage from "../Pages/user/LoginPage";
import SignupPage from "../Pages/user/SignupPage";
import Otppage from "../Pages/user/Otppage.tsx";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/user/Home.tsx";

function userRoutes() {
  return (
    <Routes>
    <Route path="/home" element={<Home />} />
      <Route element={<UserLoggedOut />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="otp-page" element={<Otppage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
    </Routes>
  );
}

export default userRoutes;
