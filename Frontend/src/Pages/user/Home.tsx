import React, { useRef } from 'react';
import Header from "../../Components/User/Header";
import Footer from "../../Components/User/Footer";
import { FAQSection, BlogPreview } from '../../Components/User/FAQSection';

// Assuming you're using a default export for the image
import image from "../../../public/Designer.png";

const Home: React.FC = () => {
  const bookingFormRef = useRef<HTMLDivElement>(null);

  const scrollToBookingForm = () => {
    bookingFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#ece8d9] min-h-screen">
      <Header />
      <div className="relative h-screen">
        <img
          className="w-full h-full object-cover filter brightness-50"
          src={image}
          alt="Designer"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in-down">
            Premium Car Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-up">
            Experience luxury care for your vehicle
          </p>
          <button 
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105 animate-pulse"
            onClick={scrollToBookingForm}
          >
            Discover Our Services
          </button>
        </div>
      </div>

      {/* Booking Form */}
      <div className="container mx-auto px-4 pt-10" ref={bookingFormRef}>
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto transform -translate-y-24">
          <h2 className="text-3xl font-bold mb-6 text-center text-black">Book Your Service</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-black mb-2">Location</label>
              <input 
                id="location"
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your location"
              />
            </div>
            <div>
              <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
              <select 
                id="serviceType"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Oil Change</option>
                <option>Tire Rotation</option>
                <option>Brake Service</option>
                <option>Full Inspection</option>
              </select>
            </div>
          </form>
          <button 
            type="submit" 
            className="mt-6 w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4  pb-3">
        <h2 className="text-4xl font-bold mb-12 text-center text-black">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Expert Technicians", icon: "👨‍🔧" },
            { title: "Quality Parts", icon: "🔧" },
            { title: "Quick Service", icon: "⚡" },
          ].map((feature, index) => (
            <div key={index} className="bg-white  rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-black mb-2">{feature.title}</h3>
              <p className="text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white text-black py-16 shadow-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "John Doe", text: "Excellent service! My car runs like new." },
              { name: "Jane Smith", text: "Professional and friendly staff. Highly recommended!" },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white drop-shadow-2xl rounded-full p-6">
                <p className="mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BlogPreview />
      <FAQSection />
      <Footer />
    </div>
  );
}

export default Home;
