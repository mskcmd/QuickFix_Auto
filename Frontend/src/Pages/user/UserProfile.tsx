import React, { useState } from "react";
import Header from "../../Components/User/Header";
import { FaUserCircle } from "react-icons/fa";

function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <>
      <Header />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-2/12 min-h-screen bg-gray-100 p-4">
          <div className="flex flex-col items-center">
            <div className="bg-yellow-200 rounded-full h-24 w-24 flex items-center justify-center">
              <FaUserCircle className="text-gray-400 text-6xl" />
            </div>
            <h2 className="mt-4 text-gray-700">SUHAIL K</h2>
          </div>
          <nav className="mt-10">
            <ul>
              <li
                className={`text-gray-700 py-2 px-4 hover:bg-gray-200 rounded-lg cursor-pointer ${
                  activeTab === "profile" && "bg-gray-300"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                My Profile
              </li>
              <li
                className={`text-gray-700 py-2 px-4 hover:bg-gray-200 rounded-lg cursor-pointer ${
                  activeTab === "bookings" && "bg-gray-300"
                }`}
                onClick={() => setActiveTab("bookings")}
              >
                Bookings
              </li>
              <li
                className={`text-gray-700 py-2 px-4 hover:bg-gray-200 rounded-lg cursor-pointer ${
                  activeTab === "payment" && "bg-gray-300"
                }`}
                onClick={() => setActiveTab("payment")}
              >
                Payment
              </li>
              <li
                className={`text-gray-700 py-2 px-4 hover:bg-gray-200 rounded-lg cursor-pointer ${
                  activeTab === "privacy" && "bg-gray-300"
                }`}
                onClick={() => setActiveTab("privacy")}
              >
                Privacy Policy
              </li>
              <li
                className="text-gray-700 py-2 px-4 hover:bg-gray-200 rounded-lg cursor-pointer"
                onClick={() => setActiveTab("logout")}
              >
                Logout
              </li>
            </ul>
          </nav>
        </div>

        {/* Content Section */}
        <div className="w-10/12 bg-white p-8">
          {activeTab === "profile" && (
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">My Profile</h2>
              <p className="text-sm text-gray-500 mb-4">Account Information</p>
              <div className="flex items-center mb-6">
                <div className="bg-gray-200 rounded-full h-24 w-24 flex items-center justify-center">
                  <FaUserCircle className="text-gray-400 text-6xl" />
                </div>
                <div className="ml-6 space-y-2">
                  <div className="bg-white p-2 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Muhammed Suhail
                    </h3>
                  </div>
                  <div className="bg-white p-2 rounded-md shadow-md">
                    <p className="text-gray-800">suhail@gmauil.com</p>
                  </div>
                  <div className="bg-white p-2 rounded-md shadow-md">
                    <p className="text-gray-800">7025686340</p>
                  </div>
                </div>
              </div>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
                Edit
              </button>
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Bookings</h2>
              <p className="text-sm text-gray-500 mb-4">
                Manage your bookings
              </p>
              <div className="space-y-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Ongoing
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Upcoming
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Completed
                </button>
              </div>
            </div>
          )}

          {activeTab === "payment" && (
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Payment</h2>
              <p className="text-sm text-gray-500 mb-4">
                View your payment history
              </p>
              {/* Payment details content goes here */}
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Privacy Policy</h2>
              <p className="text-sm text-gray-500 mb-4">
                Your privacy policy details
              </p>
              {/* Privacy policy content goes here */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
