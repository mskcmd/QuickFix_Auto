import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/store";
import { getmechData } from "../../../Api/mechanic";
import { useEffect } from "react";
import { showCustomToast } from "../../../Components/Common/Tost/Tost";

const MechanicLoggedin: React.FC = () => {
  const mechanicData = useAppSelector((state) => state.auth.mechanicData);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMechanicData = async () => {
      if (mechanicData?.mechnicId) {
        try {
          const result = await getmechData(mechanicData.mechnicId);
          console.log(result.isCompleted);

          if (!result.isCompleted) {
            showCustomToast(); // Call the toast function here
            navigate("/mechanic/register");
          }
        } catch (error) {
          console.error("Failed to fetch mechanic data:", error);
        }
      }
    };

    fetchMechanicData();
  }, [mechanicData, navigate]);

  if (mechanicData) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default MechanicLoggedin;
