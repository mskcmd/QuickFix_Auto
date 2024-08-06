import { useParams, Link } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import Header from "../../Components/User/Header";
import {
  FaMapMarkerAlt,
  FaTools,
  FaClock,
  FaCalendarCheck,
  FaStar,
  FaQuoteLeft,
  FaWrench,
  FaTimes,
} from "react-icons/fa";
import { MechanicProfile } from "../../Components/Common/Interface";
import { useState } from "react";

function MechanicDetails() {
  const { id } = useParams<{ id: string }>();
  const userSearchData = useAppSelector(
    (state) => state.auth.userSerchData
  ) as unknown as MechanicProfile[];

  console.log("ww",id);
  
  const mechanic = userSearchData.find((m) => m._id === id);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!mechanic) {
    return (
      <div className="text-center py-20 text-2xl text-gray-600">
        Mechanic not found
      </div>
    );
  }

  const dummyReviews = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      comment: "Excellent service! Fixed my car in no time.",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      comment: "Very professional and knowledgeable.",
    },
    {
      id: 3,
      name: "Mike Johnson",
      rating: 5,
      comment: "Highly recommended. Great work!",
    },
  ];

  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 relative">
                <img
                  className="h-96 w-full object-cover md:w-96"
                  src={
                    mechanic.profileImages[0]?.url ||
                    "https://via.placeholder.com/400x400"
                  }
                  alt={mechanic.specialization}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <h2 className="text-4xl font-bold text-white">
                    {mechanic.type} Mechanic
                  </h2>
                  <p className="text-xl text-indigo-300 mt-2">
                    {mechanic.specialization}
                  </p>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    <span
                      dangerouslySetInnerHTML={{ __html: mechanic.description }}
                    />
                  </p>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center text-gray-700">
                      <FaMapMarkerAlt className="mr-3 text-red-500 text-xl" />
                      <span>{mechanic.locationName}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FaClock className="mr-3 text-blue-500 text-xl" />
                      <span>{mechanic.drivingTime} minutes driving time</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FaTools className="mr-3 text-green-500 text-xl" />
                      <span>
                        {mechanic.yearsOfExperience} years of experience
                      </span>
                    </div>
                  </div>
                </div>
                <button className="mt-8 w-full bg-indigo-600 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300 flex items-center justify-center">
                  <FaCalendarCheck className="mr-2" /> Book Appointment
                </button>
              </div>
            </div>
            <div className="px-8 py-10 bg-gray-100">
              <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Our Services
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                  "Oil Change",
                  "Brake Repair",
                  "Tire Rotation",
                  "Engine Tune-up",
                  "Transmission Service",
                  "Battery Replacement",
                  "Air Conditioning",
                  "Wheel Alignment",
                  "Exhaust System",
                  "Diagnostics",
                ].map((service, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center transform hover:scale-105 transition duration-300 hover:bg-indigo-50"
                  >
                    <FaWrench className="text-indigo-500 mb-4 text-3xl" />
                    <span className="text-gray-700 font-semibold text-lg text-center">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-8 py-10">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Gallery
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mechanic.profileImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Mechanic image ${index + 1}`}
                    className="h-40 w-full object-cover rounded-lg shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
                    onClick={() => setSelectedImage(image.url)}
                  />
                ))}
              </div>
            </div>

            <div className="px-8 py-10 bg-gray-50">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Customer Reviews
              </h3>
              <div className="space-y-6">
                {dummyReviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.name}`}
                        alt={review.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-lg">{review.name}</h4>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      <FaQuoteLeft className="text-indigo-300 mr-2 inline-block" />
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/mechanicData"
              className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-full shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300"
            >
              Back to List
            </Link>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="max-w-3xl max-h-3xl relative">
            <img
              src={selectedImage}
              alt="Selected mechanic"
              className="max-w-full max-h-full"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default MechanicDetails;
