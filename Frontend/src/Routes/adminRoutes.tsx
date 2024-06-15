import { Route, Routes } from "react-router-dom"
import AdminProtucter from "../Components/Admin/AdminCommen/AdminProtucter"
import AdminLogin from "../Pages/admin/AdminLogin"
import AdminLoggedOut from "../Components/Admin/AdminCommen/AdminLoggedOut"
import AdminDashboard from "../Pages/admin/AdminDashboard"

function adminRoutes() {
  return (
    <Routes>

      <Route element={<AdminLoggedOut/>}>
        <Route path="login" element={<AdminLogin />} />
      </Route>
      <Route element={<AdminProtucter />}>
        <Route path="dashbord" element={<AdminDashboard />} />
      </Route>
    </Routes>  )
}

export default adminRoutes