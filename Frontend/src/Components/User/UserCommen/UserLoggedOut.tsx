import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../app/store";


const UserLoggedOut = () => {

    const { userData } = useAppSelector((state) => state.auth); 
    if (userData?.data.isUser) {
        return <Navigate to='/home' />
    } else {
        return <Outlet />
    }

}

export default UserLoggedOut;