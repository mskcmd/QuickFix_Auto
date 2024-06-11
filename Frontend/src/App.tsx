import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes
import LoginPage from "./Pages/user/LoginPage"
import Otppage from "./Pages/user/Otppage.tsx";
import SignupPage from "./Pages/user/SignupPage.tsx";
// import RegisterPage from "./Pages/mechanic/RegisterPage"

function App() {
  return (
    <>
      <Router>
        <>
          <Routes>
            <Route path="/" element={<SignupPage />} />
            <Route path="/user/otp-page" element={<Otppage />} />
            <Route path="/user/login" element={<LoginPage />} />
          </Routes>
        </>
      </Router>
    </>
  );
}

export default App;
