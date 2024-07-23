import { FC } from 'react';
import Header from '../../Components/Mechanic/Heder';

const MechanicProfile: FC = () => {
  return (
    <>
    <Header/>
    <div className="bg-gradient-to-br from-white to-slate-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full">
        <div className="relative h-48 sm:h-64">
          <img
            src="https://cdn.pixabay.com/photo/2012/04/16/11/39/plumber-35611_1280.png"
            alt="Mechanic at work"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <img
              src="https://cdn.pixabay.com/photo/2012/04/16/11/39/plumber-35611_1280.png"
              alt="Mechanic portrait"
              className="w-24 h-24 rounded-full border-4 border-white"
            />
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">John Doe</h2>
          <p className="text-gray-600 mb-4">Master Mechanic</p>
          <div className="flex items-center mb-4">
            <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-700">4.9 (120 reviews)</span>
          </div>
          <p className="text-gray-600 mb-6">Specializing in engine repair, brake systems, and electrical diagnostics. Over 15 years of experience in the automotive industry.</p>
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2 mb-4">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                Contact
              </button>
            </div>
            <div className="w-1/2 px-2 mb-4">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default MechanicProfile;