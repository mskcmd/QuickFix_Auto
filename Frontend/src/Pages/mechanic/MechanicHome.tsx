import { useState } from "react";
import Header from "../../Components/Mechanic/Heder";
import Navigation from "../../Components/Mechanic/Navigation";
import DashBord from "../../Components/Mechanic/DashBord";

function MechanicHome() {
  const [activeMenuItem, setActiveMenuItem] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation setActiveMenuItem={setActiveMenuItem} />
      <main className="container mx-auto mt-8">
        <div>
          {/* <h1>Active Menu Item: {activeMenuItem}</h1> */}
          {activeMenuItem === "Dashboard" && <DashBord />}
          </div>
      </main>
    </div>
  );
}

export default MechanicHome;
