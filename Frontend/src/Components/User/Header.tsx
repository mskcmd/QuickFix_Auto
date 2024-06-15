import { UserData } from "../../app/slice/AuthSlice";
import { useAppSelector } from "../../app/store";

function Header() {
  const userData: UserData | null = useAppSelector(
    (state) => state.auth.userData
  );
  console.log("ee", userData);

  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://cdn.vectorstock.com/i/1000v/63/58/car-logo-vector-36016358.jpg"
            alt="Logo"
            className="h-10 mr-4"
          />
          <h1 className="text-white text-xl font-bold">Car service</h1>
        </div>
        {userData ? (
          <div className="flex items-center">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
              alt="User Avatar"
              className="h-8 w-8 rounded-full mr-2"
            />
            <span className="text-white font-bold">{userData.data.name}</span>
          </div>
        ) : (
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
