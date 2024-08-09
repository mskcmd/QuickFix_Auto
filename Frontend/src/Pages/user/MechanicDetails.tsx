import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import Header from "../../Components/User/Header";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaTools,
  FaClock,
  FaStar,
  FaQuoteLeft,
  FaWrench,
  FaTimes,
  FaCalendarAlt,
} from "react-icons/fa";
import { MechanicProfile } from "../../Components/Common/Interface";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
}

const MechanicDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userSearchData = useAppSelector(
    (state) => state.auth.userSerchData
  ) as unknown as MechanicProfile[];
  const mechanic = userSearchData.find((m) => m._id === id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
console.log("f",mechanic?.services);

  if (!mechanic) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center h-screen bg-gray-50"
      >
        <p className="text-2xl text-gray-600 font-light">Mechanic not found</p>
      </motion.div>
    );
  }

  const dummyReviews: Review[] = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      comment: "Exceptional service! Fixed my car promptly and efficiently.",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      comment: "Very professional, knowledgeable, and courteous.",
    },
    {
      id: 3,
      name: "Mike Johnson",
      rating: 5,
      comment: "Highly recommended. Outstanding work and customer service!",
    },
  ];

  const handleBooking = () => {
    console.log("Booking initiated for mechanic:", mechanic.name);
  };

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-gray-50 min-h-screen py-12"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-lg rounded-3xl overflow-hidden"
          >
            {/* Profile Image Section */}
            <div className="relative h-64 bg-blue-500">
              <img
                src={mechanic.profileImages[1]?.url || "/default-profile.jpg"}
                alt={mechanic.specialization}
                className="h-full w-full object-cover"
              />
                <div className="absolute inset-0 flex items-center justify-center text-black text-4xl font-semibold">
                {mechanic.specialization}
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg"
                >
                  <img
                    src={
                      mechanic.profileImages[0]?.url || "/default-profile.jpg"
                    }
                    alt={mechanic.name}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </div>
            </div>

            {/* Info Section */}
            <div className="p-8 pt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  {mechanic.name}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Professional mechanic in {mechanic.locationName}, with{" "}
                  {mechanic.yearsOfExperience} years of experience in automotive
                  repair and maintenance.
                </p>
                <div className="mt-6 space-y-4">
                  <InfoItem
                    icon={<FaMapMarkerAlt className="text-blue-500" />}
                    text={mechanic.locationName}
                  />
                  <InfoItem
                    icon={<FaClock className="text-green-500" />}
                    text={`${mechanic.drivingTime} minutes driving time`}
                  />
                  <InfoItem
                    icon={<FaTools className="text-purple-500" />}
                    text={`${mechanic.yearsOfExperience} years of experience`}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                  onClick={handleBooking}
                >
                  <FaCalendarAlt className="mr-2" />
                  Book Now
                </motion.button>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  Services
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {mechanic.services.map((service, index) => (
                    <ServiceItem key={index} service={service} />
                  ))}
                </div>
              </div>
            </div>

            {/* Gallery Section */}
            <div className="px-8 py-10 bg-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Gallery
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mechanic.profileImages.map((image, index) => (
                  <GalleryImage
                    key={index}
                    image={image}
                    onClick={() => setSelectedImage(image.url)}
                  />
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="px-8 py-10">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Customer Reviews
              </h3>
              <div className="space-y-6">
                {dummyReviews.map((review) => (
                  <ReviewItem key={review.id} review={review} />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <Link
              to="/mechanicData"
              className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            >
              Back to List
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <ImageModal
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  text: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, text }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-center text-gray-700"
  >
    <span className="mr-3 text-xl">{icon}</span>
    <span>{text}</span>
  </motion.div>
);

interface ServiceItemProps {
  service: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-4 rounded-xl shadow-sm flex items-center space-x-3 border border-gray-200"
  >
    <FaWrench className="text-blue-500" />
    <span className="text-gray-700">{service}</span>
  </motion.div>
);

interface GalleryImageProps {
  image: { url: string };
  onClick: () => void;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ image, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="h-50 w-50 mx-auto overflow-hidden  shadow-md cursor-pointer"
    onClick={onClick}
  >
    <img
      src={image.url}
      alt="Mechanic gallery"
      className="h-full w-full object-cover"
    />
  </motion.div>
);

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
  >
    <div className="flex items-center mb-4">
      <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
        <span className="text-xl font-bold text-white">{review.name[0]}</span>
      </div>
      <div className="ml-4">
        <h4 className="text-lg font-semibold text-gray-800">{review.name}</h4>
        <div className="flex items-center">
          {[...Array(review.rating)].map((_, index) => (
            <FaStar key={index} className="text-yellow-500" />
          ))}
        </div>
      </div>
    </div>
    <p className="text-gray-600 leading-relaxed">
      <FaQuoteLeft className="text-gray-400 mr-2" />
      {review.comment}
    </p>
  </motion.div>
);

interface ImageModalProps {
  image: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75"
  >
    <div className="relative">
      <img
        src={image}
        alt="Selected"
        className="max-w-full max-h-full rounded-lg"
      />
      <button
        className="absolute top-2 right-2 text-white text-2xl"
        onClick={onClose}
      >
        <FaTimes />
      </button>
    </div>
  </motion.div>
);

export default MechanicDetails;
