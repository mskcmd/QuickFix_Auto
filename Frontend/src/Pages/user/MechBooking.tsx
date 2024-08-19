import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import { MechanicProfile } from "../../Components/Common/Interface";
import Header from "../../Components/User/Header";
import { FaUserAlt, FaPhoneAlt, FaMapMarkerAlt, FaTools, FaCalendarAlt, FaCar } from "react-icons/fa";

interface BookingFormData {
  firstName: string;
  phoneNumber: string;
  location: string;
  ride: string;
  dateTime: string;
  problem: string;
}

function MechBooking() {
  const { id } = useParams<{ id: string }>();
  const userSearchData = useAppSelector(
    (state) => state.auth.userSerchData
  ) as unknown as MechanicProfile[];
  const mechanic = userSearchData.find((m) => m._id === id);
console.log("hg",mechanic);

  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    phoneNumber: "",
    location: "",
    ride: "",
    dateTime: "",
    problem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement server-side booking logic
    console.log("Booking data:", formData);
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-9">
        <div className="w-full max-w-lg px-8 py-12 bg-white shadow-xl rounded-2xl animate__animated animate__fadeInUp">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Book Your Service</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                icon={<FaUserAlt />}
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <InputField
                icon={<FaPhoneAlt />}
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <InputField
              icon={<FaMapMarkerAlt />}
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
            />
            <div className="relative">
              <FaCar className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-400" />
              <select
                name="ride"
                value={formData.ride}
                onChange={handleChange}
                className="w-full px-12 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out appearance-none"
              >
                <option value="">Select Ride</option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="truck">Truck</option>
              </select>
            </div>
            <InputField
              icon={<FaCalendarAlt />}
              name="dateTime"
              type="datetime-local"
              value={formData.dateTime}
              onChange={handleChange}
            />
            <div className="relative">
              <FaTools className="absolute top-4 left-4 text-gray-400" />
              <textarea
                name="problem"
                placeholder="Describe the Problem"
                value={formData.problem}
                onChange={handleChange}
                className="w-full px-12 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
                rows={4}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

interface InputFieldProps {
  icon: React.ReactNode;
  name: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ icon, name, placeholder, type = "text", value, onChange }) => (
  <div className="relative">
    <div className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-400">{icon}</div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-12 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
    />
  </div>
);

export default MechBooking;