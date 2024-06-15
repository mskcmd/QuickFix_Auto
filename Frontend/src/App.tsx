import { BrowserRouter, Route, Routes } from "react-router-dom";
// import LoginPage from "./Pages/user/LoginPage";
// import Otppage from "./Pages/user/Otppage.tsx";
// import MOtppage from "./Pages/mechanic/Otppage.tsx";
// import SignupPage from "./Pages/user/SignupPage.tsx";
// import Home from "./Pages/user/Home.tsx";
// import LandingPage from "./Pages/user/LandingPage.tsx";
// import MRegisterPage from "./Pages/mechanic/RegisterPage";
// import MLoginPage from "./Pages/mechanic/LoginPage.tsx";
// import UserLoggedOut from "./Components/User/UserCommen/UserLoggedOut.tsx";
// import RegisterOne from "./Components/Mechanic/MechanicCommen/RegisterOne.tsx";
import AdminRouter from "./Routes/adminRoutes";
import MechanicRoutes from "./Routes/mechanicRoutes";
import UserRoutes from "./Routes/userRoutes";
import UserLoggedOut from "./Components/User/UserCommen/UserLoggedOut";
import LandingPage from "./Pages/user/LandingPage";
// import AdminDashboard from "./Pages/admin/AdminDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<UserLoggedOut />}>
            <Route path="" element={<LandingPage />} />
          </Route>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/mechanic/*" element={<MechanicRoutes />} />
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
