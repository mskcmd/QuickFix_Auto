import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../app/store";

const MechanicLoggedin = () => {
  // Adjusting the type to align with the expected state structure
  const mechanicData = useAppSelector((state) => state.auth.mechanicData);
  console.log("eee", mechanicData);
  if (mechanicData) {
    return <Outlet />;
  } else {
    return <Navigate to='/' />;
  }
}

export default MechanicLoggedin;
