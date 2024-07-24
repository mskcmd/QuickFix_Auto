import React from 'react';
import { FaUser, FaCog, FaComments, FaBars } from 'react-icons/fa';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="mr-4 md:hidden">
          <FaBars size={20} />
        </button>
        <div className="text-2xl font-bold text-gray-800">Admin Dashboard</div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-800">
          <FaComments size={20} />
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <FaCog size={20} />
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <FaUser size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;